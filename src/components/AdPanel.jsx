import React, { useEffect } from 'react';

export default function AdPanel() {
  const isInProductionMode = process.env.NODE_ENV === 'production';

  if (!isInProductionMode) {
    return (
      <div className="ad-panel">
        <h2 className="ad-panel__title">Development Mode</h2>
      </div>
    );
  }

  const pathName = window.location.pathname;

  useEffect(() => {
    const scriptElement = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1115234717744723"]',
    );

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          console.log('pushing ads');
          window.adsbygoogle.push({});
        } else {
          scriptElement?.addEventListener('load', handleScriptLoad);
          console.log('waiting until adsense lib is loaded');
        }
      } catch (err) {
        console.log('error in adsense', err.message);
      }
    };

    handleScriptLoad();

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener('load', handleScriptLoad);
      }
    };
  }, [pathName]);

  return (
    <div className="google-ad">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1115234717744723"
        data-ad-slot="3288504785"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
