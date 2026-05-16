// ─────────────────────────────────────────────────────────
//  data.js  —  Mulligan Resource Center
//  All CBE levels, grades, subjects, categories & documents
// ─────────────────────────────────────────────────────────

export const LEVELS = {
  'pre-primary': {
    label: 'Pre-Primary', icon: '🌟', color: 'lc-pink',
    grades: [
      { id:'pp1', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Pre-Primary 1', age:'Notes and Past papers', driveId:'1Vz0k6AhnTaAhJJsostNFGVDGFXjkttLH', subjects:['Mathematical Activities','Language Activities','Environmental Activities','Psychomotor & Creative Activities','Religious Education & Life Skills','Digital Literacy'] },
      { id:'pp2', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Pre-Primary 2', age:'Notes and Past papers', driveId:'1dTc2_ZOKtDs8JKqJEkNElcWACYFu1VYo', subjects:['Mathematical Activities','Language Activities','Environmental Activities','Psychomotor & Creative Activities','Religious Education & Life Skills','Digital Literacy'] },
    ],
  },
  'lower-primary': {
    label: 'Lower Primary', icon: '📗', color: 'lc-green',
    grades: [
      { id:'g1', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 1', age:'Notes and Past papers', driveId:'13q0l1ryu7xUPu9_bT-vRzt8BYkVW4p7J', subjects:['Literacy Activities','Kiswahili Language Activities','Mathematical Activities','Environmental Activities','Creative Arts','Religious Education'] },
      { id:'g2', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 2', age:'Notes and Past papers', driveId:'1GSHaVDWdZw1Yp3pXp73-9VyEwmZrhK9X', subjects:['Literacy Activities','Kiswahili Language Activities','Mathematical Activities','Environmental Activities','Creative Arts','Religious Education'] },
      { id:'g3', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 3', age:'Notes and Past papers', driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY', subjects:['Literacy Activities','Kiswahili Language Activities','Mathematical Activities','Environmental Activities','Creative Arts','Religious Education'] },
    ],
  },
  'upper-primary': {
    label: 'Upper Primary', icon: '📘', color: 'lc-blue',
    grades: [
      { id:'g4', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 4', age:'Notes and Past papers', driveId:'1Y1n-B5fg2IdJgmZykfRNSzbu4iPQR8qE', subjects:['English','Kiswahili','Mathematics','Science & Technology','Social Studies','Religious Education','Creative Arts','Physical & Health Education'] },
      { id:'g5', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 5', age:'Notes and Past papers', driveId:'1YigB_gRjvWKXDRkqR1BeiVK_2wUOLzP5', subjects:['English','Kiswahili','Mathematics','Science & Technology','Social Studies','Religious Education','Creative Arts','Physical & Health Education'] },
      { id:'g6', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 6', age:'Notes and Past papers', driveId:'1EaMELv3FUrH8TDNnKEmGMQd3veTTLR4j', subjects:['English','Kiswahili','Mathematics','Science & Technology','Social Studies','Religious Education','Creative Arts','Physical & Health Education'] },
    ],
  },
  'junior-secondary': {
    label: 'Junior Secondary', icon: '📁', color: 'lc-gold',
    grades: [
      { id:'g7', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 7', age:'Notes and Past papers', driveId:'1HGV_tzq1lW5syxM-gmbO4_jUIaGlUvuo', subjects:['English','Kiswahili','Mathematics','Integrated Science','Social Studies','Business Studies','Agriculture','Computer Science','Creative Arts','Physical Education','Religious Education','Foreign Language'] },
      { id:'g8', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 8', age:'Notes and Past papers', driveId:'1CzVAb1Ccl1xNllv387VEJLuZq9skVboh', subjects:['English','Kiswahili','Mathematics','Integrated Science','Social Studies','Business Studies','Agriculture','Computer Science','Creative Arts','Physical Education','Religious Education','Foreign Language'] },
      { id:'g9', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 9', age:'Notes and Past papers', driveId:'16q-w9r1ehmIHacJ7GfRuLgetTqbgYLh9', subjects:['English','Kiswahili','Mathematics','Integrated Science','Social Studies','Business Studies','Agriculture','Computer Science','Creative Arts','Physical Education','Religious Education','Foreign Language'] },
    ],
  },
  'senior-school': {
    label: 'Senior School', icon: '📓', color: 'lc-purple',
    grades: [
      { id:'g10', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 10', age:'Notes and Past papers', driveId:'13tl1nSZKC6nWBC0fQN5zExR0hg9pRvi-', subjects:['English','Kiswahili','Mathematics','Biology','Chemistry','Physics','History','Geography','Business Studies','Computer Science','Art & Design','Music'] },
      { id:'g11', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 11', age:'Notes and Past papers', driveId:'10tgOnrs8wniBi1FdRZO5I8jHvNDQ5sEQ', subjects:['English','Kiswahili','Mathematics','Biology','Chemistry','Physics','History','Geography','Business Studies','Computer Science','Art & Design','Music'] },
      { id:'g12', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Grade 12', age:'Notes and Past papers', driveId:'12w9JkWnZONvB6aGAt5PkLchdaxlRYIWE', subjects:['English','Kiswahili','Mathematics','Biology','Chemistry','Physics','History','Geography','Business Studies','Computer Science','Art & Design','Music'] },
    ],
  },
  'old-school': {
    label: '8.4.4', icon: '📓', color: 'lc-purple',
    grades: [
      { id:'f3', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Form 3', age:'Notes and Past papers', driveId:'1PO5jiFHUV8iu_aJvus5kDjuDe_pZdKjG-', subjects:['English','Kiswahili','Mathematics','Biology','Chemistry','Physics','History','Geography','Business Studies','Computer Science','Art & Design','Music'] },
      { id:'f4', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Form 4', age:'Notes and Past papers', driveId:'1Tne4The5I3F5dgsGBoeCGxxyiWx_I1wA', subjects:['English','Kiswahili','Mathematics','Biology','Chemistry','Physics','History','Geography','Business Studies','Computer Science','Art & Design','Music'] },
       { id:'f5', num: <i className="bi bi-mortarboard-fill" style={{fontSize:40}}></i>, label:'Set Books', age:'Summary and Questions', driveId:'1Tne4The5I3F5dgsGBoeCGxxyiWx_I1wA', subjects:['English','Kiswahili','Mathematics','Biology','Chemistry','Physics','History','Geography','Business Studies','Computer Science','Art & Design','Music'] },
    ],
  },
  'exam-revision': {
    label: 'Exam Revision', icon: '🏆', color: 'lc-coral',
    grades: [
      { id:'allgrades',  num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:30,flexShrink:0}}></i>, label:'All Grades',  age:'Primary Exit Exam', driveId:'1YcRs0GDdYu5nzXDsPQcU-7YBPUF60bwn',  subjects:['English','Kiswahili','Mathematics','Science','Social Studies & CRE'] },
      { id:'kpsea', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:30,flexShrink:0}}></i>, label:'KPSEA', age:'Grade 6 Exit Exam', driveId:'1268zQYpP0aXQm5jeWJJhbFTezOQKwXQB',  subjects:['English','Kiswahili','Mathematics','Science & Technology','Social Studies','Creative Arts','Physical & Health Education'] },
      { id:'kjsea', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:30,flexShrink:0}}></i>, label:'KJSEA', age:'Grade 9 Exit Exam', driveId:'1mmML5c8CJC-RYbDCgYNS7DDj8e6EuTMb',  subjects:['English','Kiswahili','Mathematics','Integrated Science','Social Studies','Business Studies','Agriculture','Computer Science','Creative Arts','Physical Education'] },
      { id:'kcse',  num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:30,flexShrink:0}}></i>, label:'KCSE',  age:'Secondary Exit Exam', driveId:'1iXJW8CmNDKWNLQ39H9tCt-D4wmVowJfX', subjects:['English','Kiswahili','Mathematics','Biology','Chemistry','Physics','History','Geography','Business Studies','Computer Studies'] },
    ],
  },
  'schemes-of-work': {
    label: 'Schemes of Work', icon: <i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, color: 'lc-green',
    grades: [
      { id:'tr-pp', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Pre-Primary',      age:'PP1 & PP2',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Activity Sheets','KICD Syllabus'] },
      { id:'tr-lp', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Lower Primary',    age:'Grade 1–3',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Activity Sheets','KICD Syllabus','Record of Work'] },
      { id:'tr-up', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Upper Primary',    age:'Grade 4–6',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Homework Sheets','KICD Syllabus','Record of Work'] },
      { id:'tr-js', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Junior Secondary', age:'Grade 7–9',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','Remedial Activities'] },
      { id:'tr-ss', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Senior School',      age:'Grade 10–12', driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','KCSE Prediction Papers'] },
       { id:'tr-os', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'8.4.4',      age:'Form 3–4', driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','KCSE Prediction Papers'] },
    ],
  },
  'lesson-plans': {
    label: 'Lesson Plans', icon: <i className="bi bi-file-earmark-text-fill" style={{fontSize:35,flexShrink:0}}></i>, color: 'lc-blue',
    grades: [
      { id:'tr-pp', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Pre-Primary',      age:'PP1 & PP2',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Activity Sheets','KICD Syllabus'] },
      { id:'tr-lp', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Lower Primary',    age:'Grade 1–3',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Activity Sheets','KICD Syllabus','Record of Work'] },
      { id:'tr-up', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Upper Primary',    age:'Grade 4–6',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Homework Sheets','KICD Syllabus','Record of Work'] },
      { id:'tr-js', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Junior Secondary', age:'Grade 7–9',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','Remedial Activities'] },
      { id:'tr-ss', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Senior School',      age:'Grade 10–12', driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','KCSE Prediction Papers'] },
       { id:'tr-os', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'8.4.4',      age:'Form 3–4', driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','KCSE Prediction Papers'] },
    ],
  },

  'kicd-syllabus': {
    label: 'KICD Syllabus', icon: <i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, color: 'lc-purple',
    grades: [
      { id:'tr-pp', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Pre-Primary',      age:'PP1 & PP2',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Activity Sheets','KICD Syllabus'] },
      { id:'tr-lp', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Lower Primary',    age:'Grade 1–3',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Activity Sheets','KICD Syllabus','Record of Work'] },
      { id:'tr-up', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Upper Primary',    age:'Grade 4–6',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','Homework Sheets','KICD Syllabus','Record of Work'] },
      { id:'tr-js', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Junior Secondary', age:'Grade 7–9',   driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','Remedial Activities'] },
      { id:'tr-ss', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'Senior School',      age:'Grade 10–12', driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','KCSE Prediction Papers'] },
       { id:'tr-os', num:<i className="bi bi-journal-bookmark-fill" style={{fontSize:35,flexShrink:0}}></i>, label:'8.4.4',      age:'Form 3–4', driveId:'1VgEYZGT2DIdnfMYI9S2luAblBUZs6tjY',  subjects:['Schemes of Work','Lesson Plans','Assessment Rubrics','CAT Papers','KICD Syllabus','Record of Work','KCSE Prediction Papers'] },
    ],
  },
};

export const SUBJECT_ICONS = {
  'Literacy Activities':'📝','Kiswahili Language Activities':'🗣️','Mathematical Activities':'🔢',
  'Environmental Activities':'🌿','Creative Arts':'🎨','Religious Education':'✝️',
  'English':'📖','Kiswahili':'🗣️','Mathematics':'🔢','Science & Technology':'🔬',
  'Social Studies':'🌍','Business Studies':'💼','Agriculture':'🌱','Computer Science':'💻',
  'Physical & Health Education':'🏃','Physical Education':'🏃','Integrated Science':'⚗️',
  'Foreign Language':'🌐','Music':'🎵','Art & Design':'🖌️',
  'History':'📜','Geography':'🗺️','Biology':'🧬','Chemistry':'⚗️','Physics':'🔭',
  'Social Studies & CRE':'🌍','Computer Studies':'💻',
  'Language Activities':'🗣️','Psychomotor & Creative Activities':'🤸',
  'Religious Education & Life Skills':'✝️','Digital Literacy':'💻',
  'Schemes of Work':'📅','Lesson Plans':'📋','Assessment Rubrics':'📊',
  'Activity Sheets':'📄','KICD Syllabus':'📕','Record of Work':'📒',
  'Homework Sheets':'✏️','CAT Papers':'📝','Remedial Activities':'🔄',
  'KCSE Prediction Papers':'🎯','Science':'🔬',
};

export const CATEGORIES = [
  { icon:'📝', name:'Notes & Summaries', desc:'Comprehensive topic-by-topic notes written by experienced teachers.' },
  { icon:'📋', name:'Past Papers',       desc:'Authentic past exam papers from previous years to practise with.' },
  { icon:'✅', name:'Marking Schemes',   desc:'Detailed marking guides and model answers for all past papers.' },
  { icon:'📊', name:'Revision Sets',     desc:'Targeted topic revision packs with exercises and answers.' },
];

export const TEACHER_CATEGORIES = [
  { icon:'📅', name:'Schemes of Work',    desc:'Term-by-term schemes covering all strands and competencies per subject.' },
  { icon:'📋', name:'Lesson Plans',        desc:'Ready-to-use lesson plans with objectives, activities and assessments.' },
  { icon:'📊', name:'Assessment Rubrics',  desc:'Standardised rubrics for continuous assessment tasks (CATs).' },
  { icon:'📄', name:'Activity Sheets',     desc:'Printable activity and homework sheets for learners.' },
];

// ─── DOCUMENT DATABASE ───────────────────────────────────
// HOW TO ADD A FILE:
//   1. Upload to Google Drive
//   2. Share → "Anyone with the link" → Copy link
//   3. Add an entry below matching level, grade, subject, category
// ─────────────────────────────────────────────────────────
export const DOCUMENTS = [
  { level:'lower-primary', grade:'g1', subject:'Literacy Activities', category:'Notes & Summaries',
    title:'Grade 1 Literacy – Term 1 Notes', type:'pdf', size:'1.2 MB', date:'Jan 2026', free:true,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'lower-primary', grade:'g1', subject:'Literacy Activities', category:'Past Papers',
    title:'Grade 1 Literacy – End of Term 1 Assessment', type:'pdf', size:'540 KB', date:'Mar 2026', free:true,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'lower-primary', grade:'g1', subject:'Literacy Activities', category:'Marking Schemes',
    title:'Grade 1 Literacy – Term 1 Marking Guide', type:'pdf', size:'320 KB', date:'Mar 2026', free:true,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'lower-primary', grade:'g1', subject:'Literacy Activities', category:'Revision Sets',
    title:'Grade 1 Literacy – Holiday Revision Pack', type:'docx', size:'780 KB', date:'Apr 2026', free:false,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'lower-primary', grade:'g1', subject:'Mathematical Activities', category:'Notes & Summaries',
    title:'Grade 1 Maths – Numbers 1 to 100', type:'pdf', size:'1.4 MB', date:'Feb 2026', free:true,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'lower-primary', grade:'g1', subject:'Mathematical Activities', category:'Notes & Summaries',
    title:'Grade 1 Maths – Shapes & Patterns', type:'pdf', size:'860 KB', date:'Mar 2026', free:true,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'lower-primary', grade:'g1', subject:'Mathematical Activities', category:'Past Papers',
    title:'Grade 1 Maths – CAT 1 Assessment Paper', type:'pdf', size:'420 KB', date:'Mar 2026', free:true,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'lower-primary', grade:'g1', subject:'Mathematical Activities', category:'Revision Sets',
    title:'Grade 1 Maths – Full Year Revision Booklet', type:'docx', size:'1.1 MB', date:'May 2026', free:false,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'exam-revision', grade:'kcse', subject:'Mathematics', category:'Past Papers',
    title:'KCSE Mathematics 2023 – Paper 1 & 2', type:'pdf', size:'2.2 MB', date:'Jan 2026', free:false,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'exam-revision', grade:'kcse', subject:'Biology', category:'Past Papers',
    title:'KCSE Biology 2023 – Full Paper', type:'pdf', size:'1.9 MB', date:'Jan 2026', free:false,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'exam-revision', grade:'kcse', subject:'Biology', category:'Marking Schemes',
    title:'KCSE Biology 2023 – Official Marking Scheme', type:'pdf', size:'880 KB', date:'Jan 2026', free:false,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
  { level:'exam-revision', grade:'kcse', subject:'English', category:'Notes & Summaries',
    title:'KCSE English – Essay Writing Mastery Guide', type:'pdf', size:'1.4 MB', date:'Mar 2026', free:true,
    driveLink:'https://drive.google.com/file/d/1GLpKQfTVjXar_-yz4adH5o4tQjsHYWj_/view?usp=sharing' },
];

export function getDocuments(level, grade, subject, category) {
  return DOCUMENTS.filter(
    d => d.level === level && d.grade === grade && d.subject === subject && d.category === category
  );
}

export function getFileId(link) {
  const m = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

export function previewUrl(link) {
  const id = getFileId(link);
  return id ? `https://drive.google.com/file/d/${id}/preview` : link;
}

export function downloadUrl(link) {
  const id = getFileId(link);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : link;
}
