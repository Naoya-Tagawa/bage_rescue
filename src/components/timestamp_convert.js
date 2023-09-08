import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

export function TimestampConverter( timestamp ) {
  const [japaneseTime, setJapaneseTime] = useState('');

  useEffect(() => {
    if (timestamp) {
      // Timestampからnanosecondsとsecondsを取得
      const nanoseconds = timestamp.nanoseconds || 0;
      const seconds = timestamp.seconds || 0;
      console.log(nanoseconds);
      console.log(seconds);

      // Timestampをミリ秒に変換
      const milliseconds = seconds * 1000 + nanoseconds / 1e6;

      // ミリ秒から日本時間に変換
      const japanTime = moment(milliseconds).tz('Asia/Tokyo');

      // 年、月、日、時、分、秒の表記を取得
      const year = japanTime.format('YYYY');
      const month = japanTime.format('MM');
      const day = japanTime.format('DD');
      const hour = japanTime.format('HH');
      const minute = japanTime.format('mm');
      const second = japanTime.format('ss');

      // 日本時間の表記を設定
      const japaneseTimeString = `${year}年${month}月${day}日 ${hour}時${minute}分${second}秒`;

      setJapaneseTime(japaneseTimeString);
      console.log(japaneseTimeString);
    } else {
        console.log("timestamp is null");
    }
  }, [timestamp]);

  return (
    <>
      {japaneseTime}
    </>
  );
}


