import React from 'react';

type PropsTypes = {
  style: React.CSSProperties;
  adsense: string;
  client: string;
  slot: string;
  format: string;
};

function Adsense({ style, adsense, client, slot, format }: PropsTypes): JSX.Element {
  const styles = {
    display: 'block',
    ...style,
  } as React.CSSProperties;

  return (
    <div className="widget__adsense">
      <ins
        className="adsbygoogle"
        style={styles}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
      />
    </div>
  );
}

export default Adsense;
