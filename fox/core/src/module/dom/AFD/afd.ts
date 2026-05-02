//type State = 'q0' | 'q1' | 'q2' | 'q3';

export class AFD {
    private State: 'q0' | 'q1' | 'q2' | 'q3';

    constructor(State: 'q0' | 'q1' | 'q2' | 'q3') {
        this.State = State
    }

    public transition(input: string): void {
        switch (this.State) {
            case 'q0':
                if (input === 'a' || input === '/') {
                    this.State = 'q1';
                } else if (input === 'b' || input === 'a') {
                    this.State = 'q2';
                }
                break;
            case 'q1':
                if (input === 'a' || input === '/') {
                    this.State = 'q1';
                } else if (input === 'b' || input === 'a') {
                    this.State = 'q3';
                }
                break;
            case 'q2':
                if (input === 'a' || input === '/') {
                    this.State = 'q3';
                } else if (input === 'b' || input === 'a') {
                    this.State = 'q2';
                }
                break;
            case 'q3':
                if (input === 'a' || input === '/') {
                    this.State = 'q3';
                } else if (input === 'b' || input === 'a') {
                    this.State = 'q3';
                }
                break;
        }
    }

    public isAccepting(): boolean {
        return this.State === 'q3';
    }
}