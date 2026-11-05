/* GRE Weak Area Finder: a short diagnostic plus your results across the suite, to show what to study next. */
(function () {
  'use strict';
  const QUANT = { Arithmetic: ['percentOf', 'fracAdd'], Algebra: ['linear', 'quadratic'], Geometry: ['hypotenuse', 'thirdAngle'], 'Data analysis': ['mean', 'median'], 'Counting and probability': ['dice', 'choose'], 'Number properties': ['remainder', 'factors'] };
  const APP_FOR = { 'Text completion': 'gre-text-completion', 'Sentence equivalence': 'gre-sentence-equivalence', Reading: 'gre-reading-lab', Arithmetic: 'gre-arithmetic', Algebra: 'gre-algebra', Geometry: 'gre-geometry', 'Data analysis': 'gre-statistics', 'Counting and probability': 'gre-probability', 'Number properties': 'gre-number-properties' };
  // Two questions from each of nine areas, labelled by area so results group cleanly.
  const diagnostic = (data, seed) => {
    const r = SK.rng(seed);
    const tag = (items, topic) => items.map((x) => Object.assign(x, { topic }));
    const verbal = tag(SK.fromBank(r, data.tc, 'All', 2), 'Text completion').concat(tag(SK.fromBank(r, data.se, 'All', 2), 'Sentence equivalence'), tag(SK.takeGroups(r, SK.passageItems(data.gre_reading).filter((x) => data.gre_reading.find((p) => p.id === x.group).length === 'short'), 2).slice(0, 2), 'Reading'));
    const quant = Object.entries(QUANT).flatMap(([topic, names]) => tag(SK.makeQuant(names, 2, seed + topic.length), topic));
    return verbal.concat(quant);
  };
  const App = {
    about: 'Answer 18 questions, two from each of nine GRE areas, and see your weakest areas alongside your results from every other GRE app of the suite. Each weak area links to the app that trains it.',
    how: ['Press **Start the diagnostic** in **Diagnostic**. It takes about 25 minutes.', 'Read **Report**, which combines the diagnostic with everything else you have practised.', 'Two questions per area is only a first signal; the report gets better as you practise more.'],
    tabs: [
      { id: 'diag', label: 'Diagnostic', render(el, ctx) {
        el.appendChild(SK.card('GRE diagnostic', SK.h('p', { class: 'sk-muted', text: '18 questions, two per area. Answers are shown at the end.' }), SK.btn('Start the diagnostic', () => SK.quiz(el, diagnostic(ctx.data, SK.seedNow()), { title: 'GRE diagnostic', mode: 'test', seconds: 25 * 60, logExtra: { diagnostic: true }, onFinish: () => {} }), '', { 'data-auto': 'once' })));
      } },
      { id: 'report', label: 'Report', render(el) {
        const sessions = SK.store.get('suite.sessions', []).filter((s) => s.exam === 'GRE');
        const weak = SK.weakAreas(sessions.map((s) => Object.assign({}, s, { exam: '' })), 2);
        const card = SK.card('Your weak areas');
        if (!weak.length) card.appendChild(SK.h('p', { class: 'sk-muted', text: 'Take the diagnostic or practise in other GRE apps to see a report.' }));
        else card.appendChild(SK.table(['Area', 'Answers', 'Accuracy', 'Train with'], weak.slice(0, 10).map((w) => [w.topic.trim(), w.total, w.pct + '%', APP_FOR[w.topic.trim()] ? SK.appLink(APP_FOR[w.topic.trim()], APP_FOR[w.topic.trim()]) : ''])));
        el.appendChild(card);
      } },
    ],
    diagnostic,
    checks: { 'the diagnostic covers nine areas with two questions each': (data, assert) => {
      for (let s = 1; s < 15; s++) {
        const d = diagnostic(data, s);
        assert.equal(d.length, 18);
        const counts = {}; d.forEach((x) => { counts[x.topic] = (counts[x.topic] || 0) + 1; });
        assert.equal(Object.keys(counts).length, 9); for (const v of Object.values(counts)) assert.equal(v, 2);
        for (const it of d) assert.deepEqual(SK.validateItem(it), []);
      }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
