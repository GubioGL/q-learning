// Lesson engine: pure functions, no React, so it can be unit-tested.

export type Challenge = {
    question: string;
    options: string[];
    answer: number; // index into options
    explanation: string;
};

export type Lesson = {
    id: string;
    title: string;
    intro: string;
    source: string; // reference shown to the learner
    course: string; // course id, for grouping the trail
    skill: string; // skill to recommend when the learner fails
    xp: number;
    challenges: Challenge[];
};

// Translation of a level: same challenges and options, in the same order as the Portuguese one.
export type LevelText = Pick<Lesson, "title" | "intro" | "source"> & { challenges: Omit<Challenge, "answer">[] };

export type Status = "idle" | "correct" | "wrong";

export type LessonState = {
    index: number;
    selected: number | null;
    status: Status;
    hearts: number;
    correct: number;
};

export const MAX_HEARTS = 3;

export const initialState = (): LessonState => ({
    index: 0,
    selected: null,
    status: "idle",
    hearts: MAX_HEARTS,
    correct: 0,
});

export const select = (state: LessonState, option: number): LessonState =>
    state.status === "idle" ? { ...state, selected: option } : state;

export const check = (state: LessonState, lesson: Lesson): LessonState => {
    if (state.status !== "idle" || state.selected === null) return state;
    const right = state.selected === lesson.challenges[state.index].answer;
    return right
        ? { ...state, status: "correct", correct: state.correct + 1 }
        : { ...state, status: "wrong", hearts: state.hearts - 1 };
};

export const next = (state: LessonState): LessonState =>
    state.status === "idle"
        ? state
        : { ...state, index: state.index + 1, selected: null, status: "idle" };

export const isOutOfHearts = (state: LessonState) => state.hearts <= 0;

export const isFinished = (state: LessonState, lesson: Lesson) =>
    state.index >= lesson.challenges.length;

export const progress = (state: LessonState, lesson: Lesson) =>
    Math.round((state.index / lesson.challenges.length) * 100);
