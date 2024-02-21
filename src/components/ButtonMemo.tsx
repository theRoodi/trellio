import Button, {ButtonProps} from '@mui/material/Button';
import React, {FC, memo} from 'react';

interface Props extends ButtonProps {
    children: React.ReactNode
}

export const ButtonMemo: FC<Props> = memo(({children, ...rest}) => {
    console.log('BTN')
    return (
        <Button {...rest}>{children}</Button>
    )
})