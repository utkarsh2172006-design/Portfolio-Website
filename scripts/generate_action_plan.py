"""
Utkarsh Jaiswal — Career Action Plan
Phase 1: Data Annotation Job (now, alongside exam prep)
Phase 2: Post-Sem-3 Internship Hunt (after exams + 1 project sprint)
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle,
    KeepTogether, ListFlowable, ListItem, PageBreak
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Fonts ──
pdfmetrics.registerFont(TTFont('FreeSerif', '/usr/share/fonts/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', '/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', '/usr/share/fonts/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', '/usr/share/fonts/truetype/freefont/FreeSerifBoldItalic.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')

pdfmetrics.registerFont(TTFont('FreeSans', '/usr/share/fonts/truetype/freefont/FreeSans.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-Bold', '/usr/share/fonts/truetype/freefont/FreeSansBold.ttf'))
registerFontFamily('FreeSans', normal='FreeSans', bold='FreeSans-Bold')

# ── Palette (from palette.cascade) ──
ACCENT = colors.HexColor('#0F4C5C')        # deep teal (matching resume)
ACCENT_2 = colors.HexColor('#907421')      # warm gold
SEM_SUCCESS = colors.HexColor('#508a63')    # green
SEM_WARNING = colors.HexColor('#8e784a')    # amber
SEM_ERROR = colors.HexColor('#af4d44')      # red
SEM_INFO = colors.HexColor('#4a6a8b')       # blue
TEXT_DARK = colors.HexColor('#1A1A1A')
TEXT_MUTED = colors.HexColor('#555555')
TEXT_LIGHT = colors.HexColor('#888888')
CARD_BG = colors.HexColor('#f0efec')
TABLE_STRIPE = colors.HexColor('#ecebe9')
BORDER = colors.HexColor('#c2beb4')

# ── Styles ──
title_style = ParagraphStyle(
    'Title', fontName='FreeSans-Bold', fontSize=22,
    leading=26, alignment=TA_LEFT, spaceAfter=2, textColor=TEXT_DARK
)
subtitle_style = ParagraphStyle(
    'Subtitle', fontName='FreeSans', fontSize=11,
    leading=14, alignment=TA_LEFT, textColor=ACCENT, spaceAfter=8
)
meta_style = ParagraphStyle(
    'Meta', fontName='FreeSerif-Italic', fontSize=9,
    leading=12, alignment=TA_LEFT, textColor=TEXT_MUTED, spaceAfter=14
)
section_title_style = ParagraphStyle(
    'SectionTitle', fontName='FreeSans-Bold', fontSize=14,
    leading=18, spaceBefore=14, spaceAfter=4, textColor=ACCENT,
    letterSpace=1
)
sub_title_style = ParagraphStyle(
    'SubTitle', fontName='FreeSans-Bold', fontSize=11,
    leading=14, spaceBefore=8, spaceAfter=2, textColor=TEXT_DARK
)
body_style = ParagraphStyle(
    'Body', fontName='FreeSerif', fontSize=10,
    leading=14, spaceAfter=4, alignment=TA_LEFT, textColor=TEXT_DARK
)
body_muted_style = ParagraphStyle(
    'BodyMuted', fontName='FreeSerif', fontSize=10,
    leading=14, spaceAfter=3, textColor=TEXT_MUTED
)
bullet_style = ParagraphStyle(
    'Bullet', fontName='FreeSerif', fontSize=10,
    leading=13.5, leftIndent=14, bulletIndent=2,
    spaceBefore=1, spaceAfter=1
)
callout_style = ParagraphStyle(
    'Callout', fontName='FreeSerif', fontSize=10,
    leading=14, leftIndent=10, rightIndent=10, spaceAfter=6, spaceBefore=6,
    textColor=TEXT_DARK
)

# ── Helpers ──
def section(title, num=None):
    label = f"{num}.  {title}" if num else title
    return [
        Paragraph(label.upper(), section_title_style),
        HRFlowable(width='100%', thickness=0.6, color=ACCENT, spaceBefore=0, spaceAfter=6),
    ]

def callout(text, bg=CARD_BG, border=ACCENT, text_color=TEXT_DARK):
    """A box-style callout with colored left border."""
    p = Paragraph(text, ParagraphStyle(
        'CalloutInner', fontName='FreeSerif', fontSize=10,
        leading=14, textColor=text_color, leftIndent=10, rightIndent=8,
        spaceBefore=2, spaceAfter=2
    ))
    t = Table([[p]], colWidths=[None])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg),
        ('LINEBEFORE', (0, 0), (0, -1), 3, border),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    return [t, Spacer(1, 6)]

def two_col_table(rows, col_widths=None):
    """Two-column table with left labels."""
    if col_widths is None:
        col_widths = [4.5*cm, 12.0*cm]
    data = []
    for label, value in rows:
        data.append([
            Paragraph(f'<b>{label}</b>', ParagraphStyle(
                'TL', fontName='FreeSans-Bold', fontSize=9.5,
                leading=12, textColor=ACCENT
            )),
            Paragraph(value, ParagraphStyle(
                'TR', fontName='FreeSerif', fontSize=9.5,
                leading=13, textColor=TEXT_DARK
            ))
        ])
    t = Table(data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 0), (-1, -2), 0.4, BORDER),
    ]))
    return t

# ── Build Document ──
output_path = '/home/z/my-project/download/Utkarsh_Career_Action_Plan.pdf'

doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    leftMargin=1.6*cm, rightMargin=1.6*cm,
    topMargin=1.4*cm, bottomMargin=1.4*cm,
    title='Utkarsh Jaiswal - Career Action Plan',
    author='Utkarsh Jaiswal',
    creator='Z.ai',
    subject='Data Annotation Job + Post-Sem-3 Internship Roadmap'
)

story = []

# ===== HEADER =====
story.append(Paragraph('CAREER ACTION PLAN', ParagraphStyle(
    'Eyebrow', fontName='FreeSans-Bold', fontSize=9,
    leading=12, alignment=TA_LEFT, textColor=ACCENT_2,
    letterSpace=2, spaceAfter=4
)))
story.append(Paragraph('Utkarsh Jaiswal', title_style))
story.append(Paragraph(
    'BS Applied AI &amp; Data Science · IIT Jodhpur · Semester 3',
    subtitle_style
))
story.append(Paragraph(
    'Phase 1: Land a Data Annotation job now (alongside exam prep) &nbsp;·&nbsp; '
    'Phase 2: Land an internship after Semester 3 ends',
    meta_style
))
story.append(HRFlowable(width='100%', thickness=1.2, color=TEXT_DARK, spaceBefore=0, spaceAfter=8))

# ===== TL;DR =====
story.extend(section('TL;DR — Your Next 90 Days at a Glance'))

tldr_rows = [
    ('Now → Exam', 'Sign up for 2 annotation platforms · 30 min/day · earn $50-200 while prepping for exams'),
    ('Exam Month', 'Pause annotation · focus fully on Semester 3 exams · keep accounts warm'),
    ('Post-Exam (1 wk)', 'Build ONE small portfolio project in 5-7 days · push to GitHub with README'),
    ('Post-Exam (2-4 wk)', 'Apply to 15-20 internships/week on Internshala, Wellfound, LinkedIn'),
    ('Semester 3 Ends', 'You should have: 1 project, annotation income, 30+ applications sent'),
]
story.append(two_col_table(tldr_rows))

# ===== PHASE 1: DATA ANNOTATION JOB =====
story.extend(section('Phase 1 — Data Annotation Job (Start This Week)', 1))

story.append(Paragraph(
    'This is the smartest move you can make right now. Annotation work is fully flexible, '
    'paid per task (not per hour), requires no interview, and you can do 30-60 minutes '
    'between study sessions. Most platforms pay $15-40/hr equivalent once you get fast. '
    'Companies need people who actually understand ML concepts to label training data, '
    'evaluate model outputs, and write prompts — your IIT AI&amp;DS background is a real '
    'advantage here.',
    body_style
))

# Platform comparison
story.append(Paragraph('Platform Priority List', sub_title_style))
platform_rows = [
    ('Platform', 'Pay Range', 'Effort to Start', 'Why It Fits You'),
    ('DataAnnotation.tech', '$20-40/hr', 'Medium (assessment)', 'Coding-aware tasks · best pay · ML eval work'),
    ('Outlier.ai', '$15-25/hr', 'Easy', 'AI trainer role · flexible hours · India-friendly'),
    ('Scale AI (Remotasks)', '$15-25/hr', 'Easy', 'Lots of tasks · good for beginners · paid per task'),
    ('Toloka', '$5-15/hr', 'Very easy', 'Lower pay but always has work · good warmup'),
    ('Amazon MTurk', '$2-10/hr', 'Very easy', 'Last resort · low pay · only if bored'),
]
plat_table = Table(platform_rows, colWidths=[4.0*cm, 2.5*cm, 3.0*cm, 7.0*cm])
plat_table.setStyle(TableStyle([
    ('FONTNAME', (0, 0), (-1, 0), 'FreeSans-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 9),
    ('FONTSIZE', (0, 1), (-1, -1), 9),
    ('FONTNAME', (0, 1), (-1, -1), 'FreeSerif'),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 0), (-1, 0), ACCENT),
    ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_DARK),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_STRIPE]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('GRID', (0, 0), (-1, -1), 0.3, BORDER),
]))
story.append(plat_table)
story.append(Spacer(1, 8))

# Action steps
story.append(Paragraph('Step-by-Step Action Plan (This Week)', sub_title_style))

steps = [
    ('Day 1 — Sign up for DataAnnotation.tech',
     'Use your IIT Jodhpur email if possible (looks more legit). Complete the onboarding assessment '
     'carefully — it tests basic coding + reasoning. Take 60-90 min, no rush. Quality here unlocks the '
     'higher-paying coding tasks.'),
    ('Day 2 — Apply to Outlier.ai',
     'Outlier is hiring "AI Trainers" in India actively. Select "Coding" and "Math" as your domains '
     'during onboarding. They pay weekly via PayPal/Payoneer.'),
    ('Day 3 — Sign up for Remotasks (Scale AI)',
     'Complete the basic training modules. Start with the simplest task types (image bounding boxes, '
     'text classification) to build a quality score. Higher score unlocks better-paying tasks.'),
    ('Day 4 — Set up payment',
     'Create a Payoneer account (works in India, low fees). Link it to all three platforms. '
     'PayPal also works but Payoneer has better conversion rates for USD→INR.'),
    ('Day 5-7 — Do your first tasks',
     'Aim for 2 hours total across the week. Don\'t chase money yet — chase a high quality score. '
     'Speed comes after accuracy. By end of week, you should have your first $20-50 earned.'),
]
for title, desc in steps:
    story.append(Paragraph(f'<b>{title}</b>', ParagraphStyle(
        'StepTitle', fontName='FreeSans-Bold', fontSize=10,
        leading=13, textColor=ACCENT, spaceBefore=4, spaceAfter=1
    )))
    story.append(Paragraph(desc, body_style))

# Realistic earnings callout
story.extend(callout(
    '<b>Realistic monthly earnings:</b> ₹5,000 - ₹20,000 if you do 1-2 hours/day. '
    'Enough to fund your own Udemy courses, books, or a domain for your portfolio. '
    'Do NOT sacrifice exam prep for this — exam CGPA matters more for internship shortlisting.',
    bg=colors.HexColor('#fff8e6'), border=ACCENT_2
))

# ===== PHASE 2: EXAM MONTH STRATEGY =====
story.extend(section('Phase 2 — Exam Month Strategy (Next 30 Days)', 2))

story.append(Paragraph(
    'During exam month, do NOT add new commitments. Keep your annotation accounts '
    '"warm" with 1-2 short tasks per week (15 min each) so your quality score doesn\'t '
    'decay. Everything else is exam focus. Your CGPA at the end of Sem 3 will be '
    'the single biggest internship filter — recruiters at top companies shortlist '
    'based on CGPA before reading your resume.',
    body_style
))

exam_rows = [
    ('Annotation', '15-30 min/week only · keep accounts active · no new platforms'),
    ('Exam prep', '6-8 hours/day · make a subject-wise schedule TODAY'),
    ('Sleep', '7 hours minimum · don\'t burn out for short-term money'),
    ('Portfolio', 'Don\'t touch it · you\'ll have time after exams'),
    ('LinkedIn', 'Post 1 short update during exam month (e.g. "Sem 3 exams in progress")'),
]
story.append(two_col_table(exam_rows))

# ===== PHASE 3: POST-EXAM PROJECT SPRINT =====
story.extend(section('Phase 3 — Post-Exam 7-Day Project Sprint', 3))

story.append(Paragraph(
    'The single biggest gap in your portfolio right now is "no real project on GitHub." '
    'Once exams end, dedicate 7 days to building ONE small but real project. Don\'t '
    'try to do 5 — pick one, finish it, ship it. Here\'s a realistic plan:',
    body_style
))

sprint_rows = [
    ('Day 1', 'Pick dataset from Kaggle (e.g., Titanic, Netflix titles, IPL matches) · write problem statement'),
    ('Day 2', 'Data cleaning in pandas · save cleaned CSV · commit to GitHub'),
    ('Day 3-4', 'EDA + 4-5 charts with matplotlib/seaborn · commit each chart'),
    ('Day 5', 'Build a Streamlit dashboard (1-2 hours · super easy)'),
    ('Day 6', 'Write README.md with screenshots, install steps, and what you learned'),
    ('Day 7', 'Deploy to Streamlit Community Cloud (free) · add link to resume + portfolio'),
]
story.append(two_col_table(sprint_rows))

story.extend(callout(
    '<b>Project ideas that take &lt;7 days each:</b><br/>'
    '1. <b>IPL Player Performance Dashboard</b> — pull data from Kaggle, build Streamlit app showing player stats<br/>'
    '2. <b>Netflix Viewing Analyzer</b> — upload your Netflix history, get insights + viz<br/>'
    '3. <b>Resume Screener (Mini)</b> — small NLP app that scores resume vs job description<br/>'
    '4. <b>Stock Price Predictor (Toy)</b> — simple linear regression on Nifty 50 data<br/>'
    '5. <b>COVID Trend India Dashboard</b> — public health data + interactive charts',
    bg=colors.HexColor('#e8f4f8'), border=SEM_INFO
))

# ===== PHASE 4: INTERNSHIP HUNT =====
story.extend(section('Phase 4 — Internship Hunt (After Sem 3 Ends)', 4))

story.append(Paragraph(
    'Start applying the DAY your exams end. Most students wait 2-3 weeks "to prepare" '
    '— that\'s 2-3 weeks of lost opportunities. Apply first, prepare on the fly. '
    'Here\'s where to apply and how:',
    body_style
))

# Where to apply
story.append(Paragraph('Where to Apply (in priority order)', sub_title_style))

internship_rows = [
    ('Platform / Channel', 'Best For', 'Action'),
    ('Internshala', 'Indian startups · 2-6 month internships', 'Set up alerts for "Data Analyst", "Python", "BI" — apply to 5/day'),
    ('Wellfound (AngelList)', 'Startups · remote · equity options', 'Build profile · apply to 3-5 startups/week · startup jobs convert fast'),
    ('LinkedIn Jobs', 'Corporate roles · MNCs · brand reach', 'Turn on "Open to Work" · message recruiters directly · 10 applications/week'),
    ('Naukri.com', 'Traditional Indian companies', 'Less exciting but high volume · upload resume · set alerts'),
    ('IIT Jodhpur CDC', 'Companies specifically recruiting at IIT Jodhpur', 'CHECK WEEKLY · highest conversion rate · alumni referrals'),
    ('Direct cold email', 'Startups you admire', 'Find founder on LinkedIn · send 4-line email · 5/week'),
]
intern_table = Table(internship_rows, colWidths=[4.5*cm, 5.0*cm, 7.0*cm])
intern_table.setStyle(TableStyle([
    ('FONTNAME', (0, 0), (-1, 0), 'FreeSans-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 9),
    ('FONTSIZE', (0, 1), (-1, -1), 9),
    ('FONTNAME', (0, 1), (-1, -1), 'FreeSerif'),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 0), (-1, 0), ACCENT),
    ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_DARK),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_STRIPE]),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('GRID', (0, 0), (-1, -1), 0.3, BORDER),
]))
story.append(intern_table)
story.append(Spacer(1, 8))

# Application cadence
story.append(Paragraph('Weekly Application Cadence (First 4 Weeks)', sub_title_style))
cadence_rows = [
    ('Mon-Fri', 'Apply to 5 internships/day (15 min each) · 25/week total'),
    ('Mon-Fri', 'Send 2 cold emails/day to startup founders · 10/week total'),
    ('Sat', 'Refine resume · update portfolio · 1 LinkedIn post about your project'),
    ('Sun', 'Rest · review what worked · plan next week\'s targets'),
]
story.append(two_col_table(cadence_rows))

story.extend(callout(
    '<b>Realistic conversion math:</b> 100 applications → ~15 callbacks → ~5 first rounds → '
    '~2 final rounds → <b>1 offer</b>. Don\'t get discouraged. The funnel works.',
    bg=colors.HexColor('#e8f8ec'), border=SEM_SUCCESS
))

# ===== WHAT TO PREPARE FOR INTERNSHIP INTERVIEWS =====
story.extend(section('What to Prepare for Internship Interviews', 5))

prep_rows = [
    ('SQL', 'Practice 30 problems on HackerRank (easy + medium). Know JOINs, GROUP BY, window functions.'),
    ('Python', 'Be able to write a function to clean a messy CSV using pandas · practice live coding'),
    ('Statistics', 'Mean/median/mode, normal distribution, p-value, correlation vs causation'),
    ('Case study', 'Be ready for "How would you analyze X?" questions · structure your answer out loud'),
    ('Dashboard tool', 'Build 1 sample dashboard in Power BI or Tableau · have screenshots ready'),
    ('Behavioral', 'STAR method · prepare 3-4 stories (project, teamwork, problem you solved)'),
    ('Your project', 'Know it cold · be able to explain every decision + what you\'d do differently'),
]
story.append(two_col_table(prep_rows))

# ===== FINAL CHECKLIST =====
story.extend(section('Final Checklist — Pin This to Your Wall'))

checklist = [
    'Sign up for DataAnnotation.tech, Outlier.ai, Remotasks (THIS WEEK)',
    'Set up Payoneer account for international payments',
    'Keep annotation warm during exam month (15 min/week max)',
    'Crack down on Semester 3 exams — protect your CGPA',
    'Day after exam ends: pick ONE project idea, start building',
    '7 days later: deploy to Streamlit Cloud + GitHub link to resume',
    'Apply to 25 internships/week for 4 weeks straight',
    'Send 10 cold emails/week to startup founders',
    'Post 1 update/week on LinkedIn about what you\'re learning',
    'Reach out to IIT Jodhpur seniors/alumni for referrals',
]
for item in checklist:
    story.append(Paragraph(
        f'<font color="#907421">▢</font> &nbsp; {item}',
        bullet_style
    ))

story.append(Spacer(1, 12))

story.extend(callout(
    '<b>One line summary:</b> Earn small money now (annotation), protect your CGPA (exams), '
    'build one real project (7-day sprint post-exam), then aggressively apply to internships. '
    'By end of Semester 3, you should have income, a project, and 100+ applications sent.',
    bg=colors.HexColor('#0F4C5C'), border=ACCENT, text_color=colors.white
))

# Build
doc.build(story)

# Verify
import os
file_size = os.path.getsize(output_path)
print(f"PDF generated: {output_path}")
print(f"Size: {file_size:,} bytes ({file_size/1024:.1f} KB)")

try:
    from pypdf import PdfReader
    reader = PdfReader(output_path)
    print(f"Pages: {len(reader.pages)}")
except Exception as e:
    print(f"PDF read error: {e}")
