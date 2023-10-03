import React from 'react';

export default function AdPanel() {
  const isInProductionMode = process.env.NODE_ENV === 'production';

  if (!isInProductionMode) {
    return (
      <div className="ad-panel">
        <h2 className="ad-panel__title">Development Mode</h2>
      </div>
    );
  }

  return (
    <div className="google-ad">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1115234717744723"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1115234717744723"
        data-ad-slot="3288504785"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push(
        {}
        );
      </script>
    </div>
  );
}
