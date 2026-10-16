"use client";

export default function EventObjectPage() {
  function handleClick(event) {
    console.log("Target:", event.target);
    console.log("Current target:", event.currentTarget);
    console.log("Native event:", event.nativeEvent);
  }
  return <main className="page-section"><div className="container event-demo-narrow"><span className="eyebrow">EVENT OBJECT</span><h1>Where did the event start?</h1><p>Open the browser console (F12), then click the inner text below.</p><button type="button" className="button button-primary event-demo-button" onClick={handleClick}><span>Click this text</span></button><p className="event-demo-note">The target is the originating element; currentTarget is the element running this handler.</p></div></main>;
}
