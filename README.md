# javafSlider.js


- 슬라이드를 구현할 수 있는 JQuery Library
- smaple 제공

## 1. 사용방법

#### 먼저 JQuery, javafSlider.js. javafslider.css를 다운로드 받아서 사이트에 추가한다.
```javascript
<script src="/js/d3.v4.min.js"></script> 
<script src="/js/javafSlider.js"></script>
```

#### javascript에 divId와 html의 id는 동일해야 한다.
- script tag
```javascript
<script>
  $(document).ready(function(){
      javafSlider.start({
          divId: "first-slider",
          interval: 4000,
          animation: "slide"
      });
  });
</script>
```

- html markup
```html
<div id="first-slider">
  <div class="inner-box">
      <div class="item">
          <p>slider 1</p>         
      </div>
      <div class="item">
          <p>slider 2</p>
      </div>
      <div class="item">
          <p>slider 3</p>
      </div>            
  </div> 
</div>
  ```
  
## 2. javafSlider Options
  
|속성|유형|기본값|설명|
|:---|:---|:---|:---|
|divId|String|-|슬라이드가 들어가는 tag의 id|
|interval|Number|3000|슬라이더간의 이동 간격|
|animation|String|slide|slide: slide, fade : fade|

## 3.사용예

- <a href="http://javaf.kr/inc/test/_test_javafslider.php" target="_blank">사용 예 (javaf.kr)</a>
  
