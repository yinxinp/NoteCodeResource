function getVideo() {
  const videoDom = document.querySelector('video');
  const url = videoDom.getAttribute('src');
  const title = document.querySelector('.name').innerText;

  fetch(url).then(res =>
    res.blob().then(blob => {
      const a = document.createElement('a');
      const blobUrl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
      console.log('blob', blob);
      const filename = title;
      a.href = blobUrl;
      a.download = `${filename}.mp4`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  );
}
