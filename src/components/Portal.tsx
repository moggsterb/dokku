'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  type: 'header' | 'footer';
  children: React.ReactNode;
}

const Portal = ({ type, children }: Props) => {
  const [portalID, setPortalID] = useState<HTMLElement | null>();
  useEffect(() => {
    const id = document.getElementById(
      type === 'header' ? 'gHeader' : 'gFooter'
    );
    setPortalID(id);
  }, [type]);

  return portalID && ReactDOM.createPortal(children, portalID);
};

export default Portal;
