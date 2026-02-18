// Vercel Edge Function - Proxy untuk KIMI API
// Simpan API Key di Environment Variables Vercel

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { answers, questions, typeResults, primaryType, secondaryType, scores } = await request.json();

    // Build prompt (sama seperti di frontend)
    const qaList = answers.map((answer, index) => {
      const question = questions[index];
      const selectedOption = question.options[answer.optionIndex];
      return {
        nomor: index + 1,
        pertanyaan: question.text,
        jawaban: selectedOption.text,
        tipe: answer.type
      };
    });

    const resultInfo = typeResults[primaryType];
    const secondaryInfo = secondaryType ? typeResults[secondaryType] : null;

    const prompt = `Kamu adalah Psikolog Klinis berlisensi dengan pengalaman 15+ tahun dalam psikologi hubungan dan attachment theory. Analisis jawaban kuesioner berikut secara mendalam dan profesional.

**PROFIL RESPONDEN:**
- Attachment Type Utama: ${resultInfo.name} (${scores[primaryType]} poin)
${secondaryType ? `- Attachment Type Sekunder: ${secondaryInfo.name} (${scores[secondaryType]} poin)` : ''}
- Skor Anchor: ${scores.anchor} | Island: ${scores.island} | Wave: ${scores.wave}

**DAFTAR PERTANYAAN DAN JAWABAN:**
${qaList.map(qa => `
${qa.nomor}. ${qa.pertanyaan}
   Jawaban: ${qa.jawaban}
   Tipe: ${qa.tipe.toUpperCase()}
`).join('')}

**INSTRUKSI ANALISIS:**
Berikan analisis komprehensif dalam format berikut:

1. **Pola Attachment Dominan** (2-3 paragraf)
   - Identifikasi bagaimana pola attachment ini terbentuk dari respons masa kecil
   - Jelaskan bagaimana pola ini memengaruhi cara berhubungan dewasa

2. **Insight Klinis per Tipe** 
   - Anchor: ${scores.anchor} jawaban → ${getAttachmentInsight('anchor', scores.anchor)}
   - Island: ${scores.island} jawaban → ${getAttachmentInsight('island', scores.island)}
   - Wave: ${scores.wave} jawaban → ${getAttachmentInsight('wave', scores.wave)}

3. **Strengths (Kekuatan)**
   - List 3-4 kekuatan psikologis berdasarkan jawaban

4. **Growth Areas (Area Pengembangan)**
   - List 3-4 area yang bisa dikembangkan

5. **Rekomendasi Praktis**
   - 5 tips konkret untuk hubungan yang lebih sehat

Gunakan bahasa Indonesia yang profesional namun hangat. Hindari jargon medis yang terlalu teknis, tapi tetap akurat secara klinis.`;

    // Call KIMI API (API Key aman di server)
    const kimiResponse = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KIMI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'kimi-k2.5-thinking',
        messages: [
          {
            role: 'system',
            content: 'Kamu adalah Psikolog Klinis spesialis attachment theory dan relationship psychology. Berikan analisis yang empati, profesional, dan berbasis evidence-based practice.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    if (!kimiResponse.ok) {
      throw new Error(`KIMI API Error: ${kimiResponse.status}`);
    }

    const data = await kimiResponse.json();

    return new Response(JSON.stringify({
      success: true,
      analysis: data.choices[0].message.content
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

function getAttachmentInsight(type, score) {
  const insights = {
    anchor: score >= 5 ? 'Secure functioning yang baik' : score >= 3 ? 'Cukup secure dengan area pengembangan' : 'Perlu membangun secure base',
    island: score >= 5 ? 'Self-reliance tinggi, potensi avoidant' : score >= 3 ? 'Independen dengan kebutuhan koneksi' : 'Komunikasi dan intimacy perlu dikembangkan',
    wave: score >= 5 ? 'Kecenderungan anxious attachment' : score >= 3 ? 'Emosional dengan kebutuhan validasi' : 'Self-soothing dan boundaries perlu dikuatkan'
  };
  return insights[type];
}
