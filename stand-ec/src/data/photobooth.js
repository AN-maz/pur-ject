export const GAMES = {
  VOCAB_RUSH: { title: "Vocab Rush", icon: "⚡" },
  WORD_SCRAMBLE: { title: "Word Scramble", icon: "🧩" },
  GEN_Z: { title: "Gen Z English", icon: "💀" },
  IMPOSTOR: { title: "Find Impostor", icon: "🕵️" },
  GRAMMAR_BOMB: { title: "Grammar Bomb", icon: "💣" },
};

// Port 1:1 dari resultCopy() di EC-GAMES/app.js
export function resultCopy(game, result) {
  if (game === "VOCAB_RUSH") {
    const rank =
      result.score < 400
        ? "BEGINNER"
        : result.score < 800
          ? "LEARNER"
          : result.score < 1300
            ? "EXPLORER"
            : result.score < 1800
              ? "FLUENT"
              : "VOCAB MASTER";
    return {
      title: rank,
      icon: "🏆",
      stats: [
        ["Correct", result.correct],
        ["Wrong", result.wrong],
        ["Best Streak", `🔥 ${result.best}`],
      ],
    };
  }
  if (game === "WORD_SCRAMBLE")
    return {
      title: "PUZZLE MASTER!",
      icon: "🧩",
      stats: [
        ["Solved", result.correct],
        ["Questions", result.total],
        ["Vibe", "🧠"],
      ],
    };
  if (game === "GEN_Z")
    return {
      title: result.aura >= 70 ? "CERTIFIED GEN Z" : "BOOMER ENERGY",
      icon: "💀",
      scoreLabel: `Aura ${result.aura}%`,
      stats: [
        ["Correct", result.correct],
        ["Questions", result.total],
        ["Aura", `+${result.aura}`],
      ],
    };
  if (game === "IMPOSTOR")
    return {
      title: "IMPOSTOR DETECTIVE",
      icon: "🕵️",
      stats: [
        ["Caught", result.correct],
        ["Cases", result.total],
        ["Status", "CLOSED"],
      ],
    };
  return {
    title: result.failed ? "I SURVIVED THE BOMB" : "ALL BOMBS DEFUSED!",
    icon: result.failed ? "💥" : "💣✨",
    stats: [
      ["Defused", result.correct],
      ["Bombs", result.total],
      ["Status", result.failed ? "SURVIVED" : "SAFE"],
    ],
  };
}
