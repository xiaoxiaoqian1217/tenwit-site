// import { getUuid } from './utils';
/**
 * 监听Body click, 比react事件提前执行
 */
export const createBodyClick = (ctx: any) => {
  document.body.addEventListener("click", (e: any) => {
    try {
      let target = e.target;
      const spmObj: any = {};
      while (target && target.dataset) {
        target.dataset.jtSpmb && (spmObj.pageDesc = target.dataset.jtSpmb);
        target.dataset.jtSpmc && (spmObj.blockDesc = target.dataset.jtSpmc);
        target.dataset.jtSpmd && (spmObj.buttonDesc = target.dataset.jtSpmd);
        target.dataset.jtSender && (spmObj.jtSender = target.dataset.jtSender);
        // 向上冒泡
        target = target.parentNode;
      }
      if (spmObj.jtSender) {
        const data = JSON.parse(spmObj.jtSender);
        // 优先使用业务参数data，其次spmObj
        const newSpmObj = {
          page_desc: spmObj.pageDesc,
          block_desc: spmObj.blockDesc,
          button_desc: spmObj.buttonDesc,
        };
        ctx.sendTracker({ ...newSpmObj, ...data });
      }
    } catch {}
  });
};

/**
 * 监听浏览器关闭与刷新与location.href
 */
export const createWindowUnload = (ctx) => {
  window.addEventListener("unload", () => {
    try {
      // TODO:添加关闭网页埋点
      const sessionStore = {
        ...ctx.sessionStore,
        startSource: ctx._mainObj.start_source,
        routerStack: ctx.router.routerStack,
        routerIndex: ctx.router.routerIndex,
      };
      sessionStorage.setItem(
        "jimoTrackerSessionStore",
        JSON.stringify(sessionStore)
      ); // 数据持久化
    } catch {}
  });
};

/**
 * 监听visibilitychange
 */
export const createDocumentVisibilityChange = (ctx) => {
  document.addEventListener("visibilitychange", () => {
    try {
      if (document.visibilityState === "visible") {
        ctx._mainObj.sub_session_id = "UUID";
        // ctx._mainObj.sub_session_id = getUuid();
        ctx.sendTracker({
          event_type: "hot_start",
          block_desc: "",
          button_desc: "pull_btn",
          parameters: {},
        });
      } else if (document.visibilityState === "hidden") {
        ctx.sendTracker({
          event_type: "hot_quit",
          block_desc: "",
          button_desc: "push_btn",
          parameters: {},
        });
      }
    } catch {}
  });
};
