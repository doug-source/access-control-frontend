import { BtnGroup } from '@/components/organisms/BtnGroup';
import dialogStyles from '@/shared/stylessheets/dialog.module.scss';
import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './AttachConfirmContent.module.scss';

type BtnGroupProps = ComponentPropsWithoutRef<typeof BtnGroup>;

interface AttachConfirmContentProps {
    firstLabel: BtnGroupProps['firstLabel'];
    secondLabel: BtnGroupProps['secondLabel'];
    onFirstClick: BtnGroupProps['onFirstClick'];
    onSecondClick: BtnGroupProps['onSecondClick'];
}

export const AttachConfirmContent = ({
    firstLabel,
    secondLabel,
    onFirstClick,
    onSecondClick,
}: AttachConfirmContentProps) => (
    <>
        <h3
            className={classNames(
                dialogStyles.heading,
                styles.attachConfirmHeading
            )}
        >
            Escolha o tipo
        </h3>
        <BtnGroup
            orientation="vertical"
            pattern="equal"
            className={dialogStyles.dialogBtnGroup}
            firstLabel={firstLabel}
            secondLabel={secondLabel}
            onFirstClick={onFirstClick}
            onSecondClick={onSecondClick}
        />
    </>
);
