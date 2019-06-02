import React from 'react';

declare const window: any;

type PropsTypes = {
  style?: React.CSSProperties;
  adsense?: string;
  client?: string;
  slot?: string;
  format?: string;
};

function Adsense({ style, client, slot, format }: PropsTypes): JSX.Element {
  const styles = {
    display: 'block',
    ...style,
  } as React.CSSProperties;

  const adsenseRef = React.createRef<HTMLModElement>();

  function callAdSense() {
    if (adsenseRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {}
    }
  }

  React.useEffect(() => {
    callAdSense();
  }, []);

  return (
    <div className="widget__adsense">
      <ins
        ref={adsenseRef}
        style={styles}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
      />
    </div>
  );
}

export default Adsense;
