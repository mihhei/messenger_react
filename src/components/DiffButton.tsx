import React from 'react';
 type DiffButtonProps = {
     showDiff (): void, 
 }

export const DiffButton: React.FC<DiffButtonProps> = ({showDiff}) => {
    return (
        <div className="button" onClick={showDiff}>Show diff</div>
    )
}