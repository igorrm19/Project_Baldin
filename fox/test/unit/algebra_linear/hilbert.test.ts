import { jest } from '@jest/globals';
import { PushdownAutomaton } from '../../../core/src/module/dom/AFD/algebra_linear/hilbert.js';

describe('PushdownAutomaton', () => {
    let consoleSpyLog: any;

    beforeEach(() => {
        consoleSpyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should initialize with correct name and empty stack', () => {
        const automaton = new PushdownAutomaton('test');
        expect(automaton.getStack()).toEqual([]);
    });

    it('should set stack and log correct outputs for non-accepted name', () => {
        const automaton = new PushdownAutomaton('test');
        automaton.view();
        
        const stack = automaton.getStack();
        expect(stack.length).toBe(4);
        expect(stack[0]?.state).toBe('q0');
        expect(stack[0]?.label).toBe('t');
        
        // Ensure action can be called without error
        expect(() => stack[0]?.action()).not.toThrow();

        expect(consoleSpyLog).toHaveBeenCalledWith('Automaton: test');
        expect(consoleSpyLog).toHaveBeenCalledWith('Automaton not accepted');
        expect(consoleSpyLog).toHaveBeenCalledWith('Stack:');
        expect(consoleSpyLog).toHaveBeenCalledWith('State: q0, Label: t');
        expect(consoleSpyLog).toHaveBeenCalledWith('State: q1, Label: e');
        expect(consoleSpyLog).toHaveBeenCalledWith('State: q2, Label: s');
        expect(consoleSpyLog).toHaveBeenCalledWith('State: q3, Label: t');
        expect(consoleSpyLog).toHaveBeenCalledWith('Current State: q4');
    });

    it('should output accepted for accepted name "igor"', () => {
        const automaton = new PushdownAutomaton('igor');
        automaton.view();
        
        expect(consoleSpyLog).toHaveBeenCalledWith('Automaton: igor');
        expect(consoleSpyLog).toHaveBeenCalledWith('Automaton accepted');
        expect(consoleSpyLog).toHaveBeenCalledWith('Current State: q4');
    });
});
