import React, { useEffect } from 'react';

export default function AdPanel() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('There are  no google ads to show!');
    }
  }, []);

  return (
    <div className="ad-panel">
      <h2 className="ad-panel__title">Place Your Ad Here</h2>
    </div>
    // <ins
    //   className="ad-panel"
    //   data-ad-client="ca-pub-1115234717744723"
    //   data-ad-slot="3903146717"
    //   data-ad-format="auto"
    //   data-full-width-responsive="true"
    // />
  );
}
