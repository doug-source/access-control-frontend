import { useSignState } from '@/shared/hooks/useSignState';
import styles from './ConfirmationConfig.module.scss';
import { ConfirmationRow } from './shared/ConfirmationRow';

export const ConfirmationsConfig = () => {
    const {
        state: { confirmations },
        dispatch,
    } = useSignState();

    return (
        <section>
            <article>
                <fieldset>
                    <legend>Usuários</legend>
                    <ul className={styles.unordered}>
                        <ConfirmationRow
                            checked={confirmations.remotions.user}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        remotions: { user: evt.target.checked },
                                    },
                                });
                            }}
                            description="Remoção"
                            name="user-remotion"
                        />
                        <ConfirmationRow
                            checked={confirmations.restorations.user}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        restorations: {
                                            user: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Restauração"
                            name="user-restoration"
                        />
                    </ul>
                </fieldset>
            </article>
            <article>
                <fieldset>
                    <legend>Pedidos de Registro</legend>
                    <ul className={styles.unordered}>
                        <ConfirmationRow
                            checked={confirmations.remotions.registerRequest}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        remotions: {
                                            registerRequest: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Remoção"
                            name="register-request-remotion"
                        />
                        <ConfirmationRow
                            checked={confirmations.approvements.registerRequest}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        approvements: {
                                            registerRequest: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Aprovação"
                            name="register-request-approvement"
                        />
                    </ul>
                </fieldset>
            </article>
            <article>
                <fieldset>
                    <legend>Papéis</legend>
                    <ul className={styles.unordered}>
                        <ConfirmationRow
                            checked={confirmations.remotions.role}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        remotions: {
                                            role: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Remoção"
                            name="role-remotion"
                        />
                        <ConfirmationRow
                            checked={confirmations.attachment.role}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        attachment: {
                                            role: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Vinculação"
                            name="role-attachment"
                        />
                        <ConfirmationRow
                            checked={confirmations.detachment.role}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        detachment: {
                                            role: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Desvinculação"
                            name="role-detachment"
                        />
                    </ul>
                </fieldset>
            </article>
            <article>
                <fieldset>
                    <legend>Habilidades</legend>
                    <ul className={styles.unordered}>
                        <ConfirmationRow
                            checked={confirmations.remotions.ability}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        remotions: {
                                            ability: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Remoção"
                            name="ability-remotion"
                        />
                        <ConfirmationRow
                            checked={confirmations.attachment.ability}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        attachment: {
                                            ability: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Vinculação"
                            name="ability-attachment"
                        />
                        <ConfirmationRow
                            checked={confirmations.detachment.ability}
                            onChange={(evt) => {
                                dispatch({
                                    type: 'CONFIG_CONFIRMATION_UPDATING',
                                    payload: {
                                        detachment: {
                                            ability: evt.target.checked,
                                        },
                                    },
                                });
                            }}
                            description="Desvinculação"
                            name="ability-detachment"
                        />
                    </ul>
                </fieldset>
            </article>
        </section>
    );
};
