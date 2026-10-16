"""
Utkarsh Jaiswal — ATS-Safe Resume Generator
Target: Data Analyst internship roles
Style: Single-column, ATS-friendly, classic professional
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration ──
pdfmetrics.registerFont(TTFont('FreeSerif', '/usr/share/fonts/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', '/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', '/usr/share/fonts/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', '/usr/share/fonts/truetype/freefont/FreeSerifBoldItalic.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')

# Sans-serif for name and section titles (more modern feel, still ATS-safe)
pdfmetrics.registerFont(TTFont('FreeSans', '/usr/share/fonts/truetype/freefont/FreeSans.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-Bold', '/usr/share/fonts/truetype/freefont/FreeSansBold.ttf'))
registerFontFamily('FreeSans', normal='FreeSans', bold='FreeSans-Bold')

# ── Color Palette (Minimalist Professional) ──
ACCENT = colors.HexColor('#0F4C5C')   # Deep teal — professional, data-focused
TEXT_DARK = colors.HexColor('#1A1A1A')
TEXT_MUTED = colors.HexColor('#555555')
RULE_COLOR = colors.HexColor('#0F4C5C')

# ── Styles ──
name_style = ParagraphStyle(
    'ResumeName', fontName='FreeSans-Bold', fontSize=20,
    leading=23, alignment=TA_CENTER, spaceAfter=1, textColor=TEXT_DARK
)
subtitle_style = ParagraphStyle(
    'ResumeSubtitle', fontName='FreeSans', fontSize=10.5,
    leading=13, alignment=TA_CENTER, textColor=ACCENT, spaceAfter=3
)
contact_style = ParagraphStyle(
    'ResumeContact', fontName='FreeSerif', fontSize=9.5,
    leading=13, alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=6
)
section_title_style = ParagraphStyle(
    'ResumeSectionTitle', fontName='FreeSans-Bold', fontSize=11,
    leading=13, spaceBefore=6, spaceAfter=1, textColor=ACCENT,
    letterSpace=1
)
job_title_style = ParagraphStyle(
    'ResumeJobTitle', fontName='FreeSerif-Bold', fontSize=10,
    leading=12.5, spaceAfter=1
)
job_meta_style = ParagraphStyle(
    'ResumeJobMeta', fontName='FreeSerif-Italic', fontSize=9.5,
    leading=12, textColor=TEXT_MUTED, spaceAfter=2
)
bullet_style = ParagraphStyle(
    'ResumeBullet', fontName='FreeSerif', fontSize=9.5,
    leading=12.5, leftIndent=10, bulletIndent=0,
    spaceBefore=0, spaceAfter=0
)
body_style = ParagraphStyle(
    'ResumeBody', fontName='FreeSerif', fontSize=9.5,
    leading=12.5, spaceAfter=1
)
skills_style = ParagraphStyle(
    'ResumeSkills', fontName='FreeSerif', fontSize=9.5,
    leading=12.5, spaceAfter=1
)

# ── Helpers ──
def section_header(title):
    return [
        Paragraph(title.upper(), section_title_style),
        HRFlowable(width='100%', thickness=0.8, color=RULE_COLOR,
                   spaceBefore=0, spaceAfter=3),
    ]

def experience_entry(title, company, dates, bullets, tech_stack=None):
    elements = [
        Paragraph(f'<b>{title}</b> &nbsp;|&nbsp; {company} &nbsp;|&nbsp; {dates}', job_title_style),
    ]
    for b in bullets:
        elements.append(Paragraph(f'\u2022 {b}', bullet_style))
    if tech_stack:
        elements.append(Paragraph(
            f'<font color="#555555"><i>Tools:</i></font> {tech_stack}',
            skills_style
        ))
    elements.append(Spacer(1, 2))
    return elements

def education_entry(degree, school, dates, details=None):
    elements = [
        Paragraph(f'<b>{degree}</b> &nbsp;|&nbsp; {school} &nbsp;|&nbsp; {dates}', job_title_style),
    ]
    if details:
        elements.append(Paragraph(details, body_style))
    elements.append(Spacer(1, 2))
    return elements

def skills_row(categories):
    elements = []
    for cat, vals in categories:
        elements.append(Paragraph(
            f'<b>{cat}:</b> &nbsp; {vals}',
            skills_style
        ))
    return elements

# ── Build Document ──
output_path = '/home/z/my-project/download/Utkarsh_Jaiswal_Resume.pdf'

doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    leftMargin=1.3*cm, rightMargin=1.3*cm,
    topMargin=1.2*cm, bottomMargin=1.2*cm,
    title='Utkarsh Jaiswal - Resume',
    author='Utkarsh Jaiswal',
    creator='Z.ai',
    subject='Data Analyst Resume'
)

story = []

# ===== HEADER =====
story.append(Paragraph('UTKARSH JAISWAL', name_style))
story.append(Paragraph('Aspiring Data Analyst &nbsp;&bull;&nbsp; AI &amp; Data Science Undergraduate',
                      subtitle_style))
story.append(Paragraph(
    'utkarsh2172006@gmail.com &nbsp;|&nbsp; +91 9236064084 &nbsp;|&nbsp; '
    'linkedin.com/in/utkarsh-jaiswal-7b2938376 &nbsp;|&nbsp; '
    'github.com/utkarsh2172006-design &nbsp;|&nbsp; India',
    contact_style
))

# ===== PROFESSIONAL SUMMARY =====
story.extend(section_header('Professional Summary'))
story.append(Paragraph(
    'Undergraduate BS Applied AI &amp; Data Science student at IIT Jodhpur with hands-on '
    'experience in Python, SQL, Excel, Power BI, and Tableau through real-world projects and '
    'job simulations. Skilled at transforming raw data into clear, business-relevant insights '
    'via data cleaning, exploratory analysis, and interactive dashboards. Completed virtual '
    'data analytics simulations with Quantium and Deloitte Australia, building expertise in '
    'customer behaviour analysis, telemetry data, and uplift testing. Seeking a Data Analyst '
    'internship to apply analytical thinking and visualization skills in a professional setting.',
    body_style
))

# ===== EDUCATION =====
story.extend(section_header('Education'))
story.extend(education_entry(
    'BS in Applied AI &amp; Data Science',
    'Indian Institute of Technology (IIT) Jodhpur',
    '2025 \u2013 2029 (Expected)',
    '<b>Year:</b> 1st Year Completed &nbsp;|&nbsp; <b>CGPA:</b> 7.25 / 10<br/>'
    '<b>Relevant Coursework:</b> Probability &amp; Statistics, Linear Algebra, '
    'Programming in Python, Database Management Systems, Data Structures, '
    'Foundations of Machine Learning'
))
story.extend(education_entry(
    'Higher Secondary (Class XII) \u2013 PCM',
    'CBSE / State Board',
    '2025',
    'Physics, Chemistry, Mathematics'
))

# ===== TECHNICAL SKILLS =====
story.extend(section_header('Technical Skills'))
story.extend(skills_row([
    ('Programming', 'Python (pandas, numpy, matplotlib, seaborn), SQL'),
    ('Data Analysis', 'Exploratory Data Analysis (EDA), data cleaning &amp; wrangling, '
                       'customer segmentation, uplift testing, statistical analysis'),
    ('BI &amp; Visualization', 'Power BI, Tableau, Microsoft Excel (pivot tables, formulas, charts)'),
    ('Databases', 'SQL (SELECT, WHERE, GROUP BY, JOINs, subqueries)'),
    ('Tools &amp; Concepts', 'Git &amp; GitHub, Jupyter Notebook, scikit-learn (basic), '
                              'foundations of ML and statistics'),
]))

# ===== PROJECTS & JOB SIMULATIONS =====
story.extend(section_header('Projects &amp; Job Simulations'))

story.extend(experience_entry(
    'Data Analytics Virtual Internship',
    'Quantium (via The Forage)',
    '2025',
    [
        'Processed and cleaned customer transaction data using Python (pandas), '
        'handling missing values and inconsistencies to build an analysis-ready dataset.',
        'Explored purchasing patterns and performed customer segmentation to uncover '
        'actionable trends in buying behaviour across product categories.',
        'Designed a benchmark/control store comparison and applied uplift testing logic '
        'to isolate the impact of a trial layout change on sales performance.',
        'Translated statistical findings into commercial insights and actionable '
        'recommendations for category management, delivered in a business-ready format.',
    ],
    tech_stack='Python, pandas, matplotlib, Excel'
))

story.extend(experience_entry(
    'Data Analytics Virtual Internship',
    'Deloitte Australia (via The Forage) \u2014 Client: Daikibo Industrials',
    '2025',
    [
        'Analyzed manufacturing telemetry data to identify data quality issues and '
        'understand equipment performance patterns across multiple factory sites.',
        'Built interactive dashboards to visualize operational metrics, making equipment '
        'health and performance trends easy to monitor at a glance.',
        'Identified recurring operational patterns and summarized findings into business '
        'insights supporting maintenance scheduling and efficiency decisions.',
    ],
    tech_stack='Excel, Tableau / Power BI'
))

# ===== CERTIFICATIONS =====
story.extend(section_header('Certifications'))
story.append(Paragraph(
    '\u2022 <b>Quantium Data Analytics Job Simulation</b> &nbsp;|&nbsp; The Forage &nbsp;|&nbsp; 2025',
    bullet_style
))
story.append(Paragraph(
    '\u2022 <b>Deloitte Australia Data Analytics Job Simulation</b> &nbsp;|&nbsp; The Forage &nbsp;|&nbsp; 2025',
    bullet_style
))

# ===== CORE STRENGTHS =====
story.extend(section_header('Core Strengths'))
story.append(Paragraph(
    'Analytical Thinking &nbsp;&bull;&nbsp; Self-Learning &nbsp;&bull;&nbsp; Adaptability '
    '&nbsp;&bull;&nbsp; Business Understanding &nbsp;&bull;&nbsp; Problem Solving '
    '&nbsp;&bull;&nbsp; Data Storytelling',
    body_style
))

# Build the PDF
doc.build(story)
print(f"Resume PDF generated: {output_path}")

# Verify file size and page count
import os
file_size = os.path.getsize(output_path)
print(f"File size: {file_size} bytes ({file_size/1024:.1f} KB)")

try:
    from pypdf import PdfReader
    reader = PdfReader(output_path)
    print(f"Page count: {len(reader.pages)}")
except Exception as e:
    print(f"Could not read PDF: {e}")
