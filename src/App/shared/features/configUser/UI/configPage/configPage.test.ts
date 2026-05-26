import { UserConfigComponent } from './configPage';
import { LoginServices } from '../../../login/services/loginServices';

jest.mock('../../../login/services/loginServices');

describe('UserConfigComponent', () => {
    let parent: HTMLElement;

    beforeEach(() => {
        parent = document.createElement('div');
        jest.clearAllMocks();
        // Since constructor requires template from raw, we mock BaseModel to not actually require real templates
        // Actually, let's just let it run.
    });

    it('handles empty user name and email', async () => {
        (LoginServices.prototype.getUser as jest.Mock).mockResolvedValue({ name: '', email: '' });
        const component = new UserConfigComponent();
        await (component as unknown as { init: (parent: HTMLElement) => Promise<void> }).init(parent);
        expect((component as unknown as { _userName: string })._userName).toBe('User');
    });

    it('handles null response', async () => {
        (LoginServices.prototype.getUser as jest.Mock).mockResolvedValue(null);
        const component = new UserConfigComponent();
        await (component as unknown as { init: (parent: HTMLElement) => Promise<void> }).init(parent);
        expect((component as unknown as { _userName: string })._userName).toBe('User');
    });

    it('handles error in fetch', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (LoginServices.prototype.getUser as jest.Mock).mockRejectedValue(new Error('Network error'));
        const component = new UserConfigComponent();
        await (component as unknown as { init: (parent: HTMLElement) => Promise<void> }).init(parent);
        expect(consoleSpy).toHaveBeenCalledWith("[UserConfigComponent] Failed to fetch user info:", expect.any(Error));
        consoleSpy.mockRestore();
    });
});
