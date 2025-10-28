import sys
from pathlib import Path

try:
    from PyPDF2 import PdfReader
except Exception as e:
    print('PyPDF2 non installé:', e)
    sys.exit(2)

root = Path(__file__).resolve().parent.parent
pdfs = [
    root / 'TP 1 _ Développement d_une plateforme de recettes culinaires interactive _GourmeTech_ (1).pdf',
    root / 'TP 2 _ Développement d_une plateforme de recettes culinaires interactive _GourmeTech_.pdf',
]

for pdf in pdfs:
    if not pdf.exists():
        print(f'Fichier non trouvé: {pdf}')
        continue
    try:
        reader = PdfReader(str(pdf))
        text_out = root / (pdf.stem + '.txt')
        with text_out.open('w', encoding='utf-8') as f:
            for i, page in enumerate(reader.pages):
                try:
                    t = page.extract_text() or ''
                except Exception as e:
                    t = f'<!-- erreur extraction page {i}: {e} -->\n'
                f.write(t + '\n\n')
        print(f'Extrait: {text_out}')
    except Exception as e:
        print(f'Erreur lecture {pdf}: {e}')
