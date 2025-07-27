import { AttachConfirmContent } from '@/components/molecules/AttachConfirmContent';
import { Dialog } from '@/components/molecules/Dialog';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import { type LocationStateBetweenScreen } from '@/shared/types/LocationStateBetweenScreen';
import { type UserIndex } from '@/shared/types/Models/User';
import classNames from 'classnames';

interface AttachConfirmationProps {
    user: UserIndex | null;
    idToAttach: number | null;
    onClose(): void;
    className?: string;
}

export const AttachConfirmation = ({
    user,
    idToAttach,
    onClose,
    className,
}: AttachConfirmationProps) => {
    const navigate = useLocalNavigate();
    if (!idToAttach || user === null) {
        return null;
    }
    return (
        <Dialog
            show
            aria-label={`Vinculação de papéis ou habilidades`}
            heading="Vinculação"
            className={classNames(dialogStyles.dialog, className)}
            onClose={onClose}
        >
            <AttachConfirmContent
                firstLabel="Papel"
                secondLabel="Habilidade"
                onFirstClick={() => {
                    navigate(`/roles/user/${idToAttach}/attach`, {
                        state: {
                            data: user,
                            label: 'Escolha de novos papéis',
                            value: `Usuário: ${user.name}`,
                        } as LocationStateBetweenScreen<UserIndex>,
                    });
                }}
                onSecondClick={() =>
                    navigate(`/abilities/user/${idToAttach}/attach`, {
                        state: {
                            data: user,
                            label: 'Escolha de novas habilidades',
                            value: `Usuário: ${user.name}`,
                        },
                    })
                }
            />
        </Dialog>
    );
};
