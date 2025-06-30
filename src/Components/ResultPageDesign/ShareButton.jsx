function ShareButton() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Potato Disease Result",
        text: "Check out this prediction result",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-5 py-3 mt-4 text-white bg-blue-600 rounded-xl hover:bg-blue-500"
    >
      📤 Share This Result
    </button>
  );
}

export default ShareButton;
