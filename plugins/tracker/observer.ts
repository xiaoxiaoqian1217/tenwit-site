import { trackerInstance } from "./index.client";

const requestIdleCallback =
  process.client?.requestIdleCallback ||
  function (callback, options) {
    var options = options || {};
    var relaxation = 1;
    var timeout = options.timeout || relaxation;
    var start = performance.now();
    return setTimeout(function () {
      callback({
        get didTimeout() {
          return options.timeout
            ? false
            : performance.now() - start - relaxation > timeout;
        },
        timeRemaining: function () {
          return Math.max(0, relaxation + (performance.now() - start));
        },
      });
    }, relaxation);
  };

// 避免重复操作dom ， 从缓存中获取
const getCacheTargetData = (trackerInstance, change) => {
  console.log(
    "%c [ change ]-134",
    "font-size:13px; background:pink; color:#bf2c9f;",
    change
  );
  try {
    let target = change.target;
    let spmObj: any = {};
    const alreadyDatasetObj = trackerInstance?._domSpmCache?.get(change.target);
    if (!alreadyDatasetObj) {
      while (target && target.dataset) {
        target.dataset.jtSpmb && (spmObj.pageDesc = target.dataset.jtSpmb);
        target.dataset.jtSpmc && (spmObj.blockDesc = target.dataset.jtSpmc);
        target.dataset.jtSpmd && (spmObj.buttonDesc = target.dataset.jtSpmd);
        // 向上冒泡
        target = target.parentNode;
      }
      trackerInstance?._domSpmCache?.set(change.target, spmObj);
    } else {
      spmObj = alreadyDatasetObj;
    }
    const data = JSON.parse(
      change.target.dataset.jtBlockExposure ||
        change.target.dataset.jtHideElementExposure
    );

    // 优先使用业务参数data，其次spmObj
    const newSpmObj = {
      page_desc: spmObj.pageDesc,
      block_desc: spmObj.blockDesc,
      button_desc: spmObj.buttonDesc,
    };
    return { ...newSpmObj, ...data };
  } catch {}
};

function handleLog(list) {
  list.forEach((entry) => {
    const params = getCacheTargetData(trackerInstance, entry);
    console.info("exposure tracker! log here", params);
    // trackerInstance.sendTracker(params);
    entry.target.dataset.exposureTrackerExposed = "1";
  });
}
const events = [];
const list = [];
let isRequestIdleCallbackScheduled = false;
// 模块曝光observer
let observer;
if (process.client) {
  observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.5, 1],
  });
}

function callback(entries) {
  entries.forEach((entry) => {
    if (
      entry.target.dataset.exposureTrackerExposed !== "1" &&
      entry.intersectionRatio >= 0.5
    ) {
      list.push(entry);
      const params = getCacheTargetData(trackerInstance, entry);
      // "1" 标志元素已经被曝光
      entry.target.dataset.exposureTrackerExposed = "1";
      events.push(params);
    } else if (entry.intersectionRatio === 0) {
      delete entry.target.dataset.exposureTrackerExposed;
    }
  });
  schedulePendingEvents();
}
function schedulePendingEvents() {
  // Only schedule the rIC if one has not already been set.
  if (isRequestIdleCallbackScheduled) return;

  isRequestIdleCallbackScheduled = true;

  if ("requestIdleCallback" in window) {
    // Wait at most two seconds before processing events.
    requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });
  }
}

function processPendingAnalyticsEvents(deadline) {
  isRequestIdleCallbackScheduled = false;
  // Go for as long as there is time remaining and work to do.
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    events.length > 0
  ) {
    var evt = events.pop();
    trackerInstance.sendTracker(evt);
    // Check if there are more events still to send.
    if (events.length > 0) schedulePendingEvents();
    // else v
  }
  // // 初始化模块曝光
}

export function collectTargets() {
  const els = Array.from(
    document.querySelectorAll("[data-jt-block-exposure]")
  ).filter((el) => !el.dataset.exposureTrackerTracked);

  if (els.length > 0) {
    // observer.disconnect();
    els.forEach((el) => {
      observer.observe(el);
      // "1"  标志元素已被观察
      el.dataset.exposureTrackerTracked = "1";
    });
  }
}
const readedCallback = (entries) => {

}

// 阅读完成曝光observer
let hideObserver;
if (process.client) {
  hideObserver = new IntersectionObserver(readedCallback, {
    root: null,
    rootMargin: "0px",
  });
}


export function collectHideTargets() {
  const els = Array.from(
    document.querySelectorAll("[data-jt-hide-element-exposure]")
  ).filter((el) => !el.dataset.exposureTrackerTracked);
  if (els.length > 0) {
    // observer.disconnect();
    els.forEach((el) => {
      hideObserver.observe(el);
      // "1"  标志元素已被观察
      el.dataset.exposureTrackerTracked = "1";
    });
  }
}