import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import { runChorusEngine } from '../../../lib/chorusEngine'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) return res.status(400).json({ error: 'File error' })

    const file = Array.isArray(files.file) ? files.file[0] : files.file
    const buffer = fs.readFileSync(file.filepath)

    const analysis = await runChorusEngine(buffer)

    const structuredVerdict = `🔍 CHORUS-X™ Live Engine Evaluation (NAS100USD 1m @ 23:22)
🎯 FINAL VERDICT: ${analysis.finalVerdict}

🔵 DIRECTIONAL SCORECARD
Direction	Verdict	Score	Continuation	Comment
✅ BUY	${analysis.buyVerdict}	${analysis.buyScore}%	${analysis.buyCont}	${analysis.buyComment}
❌ SELL	${analysis.sellVerdict}	${analysis.sellScore}%	${analysis.sellCont}	${analysis.sellComment}

⚙️SCE STRATEGY ACTIVATION STATUS
Strategy	BUY	SELL	Notes
PTLM 6.5	${analysis.ptlmBuy}	${analysis.ptlmSell}	${analysis.ptlmNotes}
SB Model	${analysis.sbBuy}	${analysis.sbSell}	${analysis.sbNotes}
AmalFX	${analysis.amalBuy}	${analysis.amalSell}	${analysis.amalNotes}
Narrative	${analysis.narrativeBuy}	${analysis.narrativeSell}	${analysis.narrativeNotes}

🛡️ PROP FIRM GUARD
SL: ${analysis.stopLoss} | TP: ${analysis.takeProfit} | RR: ${analysis.riskReward} | HTF Bias: ${analysis.htfBias}
${analysis.guardComment}

🧠 STRUCTURE + ENTRY SUMMARY
Sweep: ${analysis.sweep}
CHoCH: ${analysis.choch}
Return to OB: ${analysis.return}
Rejection Candle: ${analysis.rejection}
Final BOS: ${analysis.bos}

📝 TRADE LOG
${analysis.tradeLog}`;

    res.status(200).json({ verdict: structuredVerdict })
  })
}