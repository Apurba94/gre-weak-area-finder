# GRE Weak Area Finder

A short diagnostic across all GRE topics, combined with your results in other apps, to show what to study next.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `GRE Weak Area Finder.exe` from the [latest release](https://github.com/Apurba94/gre-weak-area-finder/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-weak-area-finder/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Answer 18 questions, two from each of nine GRE areas, and see your weakest areas alongside your results from every other GRE app of the suite. Each weak area links to the app that trains it.

Sections: Diagnostic, Report, Progress, About.

## How to use it

1. Press **Start the diagnostic** in **Diagnostic**. It takes about 25 minutes.
2. Read **Report**, which combines the diagnostic with everything else you have practised.
3. Two questions per area is only a first signal; the report gets better as you practise more.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
