# English Garden

一個繁體中文介面的遊戲化英文練習網站，提供可搜尋的 7,298 字 CEFR A1–C2 詞庫。

## 遊戲功能

- 單字闖關與句子填空：可依 CEFR A1–C2 篩選並隨機抽題，答對獲得 XP，連續答對有加成。
- 可搜尋 7,298 個單字，查看 CEFR、詞性、繁體中文解釋與例句。
- 實力檢測挑戰賽：依選定級別完成 100 題不重複單字題，結束顯示正確率，並在頁面下方累積成績曲線。
- 聽力探索：使用瀏覽器內建的語音合成功能播放單字。
- 每日三項任務、等級、連續學習紀錄與徽章收藏。
- 學習進度與挑戰賽紀錄存在各訪客自己的瀏覽器 `localStorage`。
- 詞庫來源：[Word Atlas contributors](https://github.com/designfuchen/word-atlas)，7,298 個 A1–C2 詞條；文字、插圖和錄音以 CC BY 4.0 釋出，本站僅使用詞條文字資料並保留署名。此詞庫為開放學習資料，不代表官方 IELTS 詞表。
- 詞庫中文使用 OpenCC JS 轉為臺灣繁體中文；詞條 CEFR 級別依來源資料標示，個別詞義仍可能受語境影響。

## 隱私

網站沒有登入、個資欄位、分析追蹤或外部生成式 AI API。學習紀錄留在使用者裝置上。網站本身不包含後台服務；公開代管服務可能會依其政策記錄一般連線資訊。為載入詞庫與簡繁轉換程式，瀏覽器會連線至 GitHub raw 與 jsDelivr；不會傳送學習進度或其他個人資料。字型使用裝置上的系統字型，不會連到 Google Fonts。

## 本機預覽

開啟 `index.html` 即可使用；語音播放需瀏覽器支援 `speechSynthesis`。

## 公開部署

公開網址：https://garret111.github.io/english-garden/

網站由 GitHub Pages 發布。公開 repository 只包含此網站程式，不含原私人 repository 的其他檔案。

