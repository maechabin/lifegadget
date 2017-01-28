import React from 'react';

const Adsense = (props) => {
  const style = Object.assign({}, { display: 'block' }, props.style);
  return (
    <div className="widget__adsense">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={props.client}
        data-ad-slot={props.slot}
        data-ad-format={props.format}
      />
    </div>
  );
};

Adsense.propTypes = {
  client: React.PropTypes.string,
  slot: React.PropTypes.string,
  format: React.PropTypes.string,
};

export default Adsense;
