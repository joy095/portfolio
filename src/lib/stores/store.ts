import { writable } from 'svelte/store';

// This store tracks whether the header animation is complete
export const headerAnimationComplete = writable(false);
