import React from 'react';

const Adsense = (props) => {
  return (
    <div className="widget_adsense">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={props.client}
        data-ad-slot={props.slot}
        data-ad-format={props.format}
      />
    </div>
  );
};

export default Adsense;
