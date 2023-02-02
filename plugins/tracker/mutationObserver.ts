import { collectTargets } from "./observer";

const observerOptions = {
  childList: true, // 观察目标子节点的变化，是否有添加或者删除
  attributes: true, // 观察属性变动
  subtree: true, // 观察后代节点，默认为 false
};

function callback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    // console.log(mutation.type, mutation)
    switch (mutation.type) {
      case "childList":
        collectTargets();
        break;
    }
  });
}

const mutationObserver = new MutationObserver(callback);
const ele = document.getElementById("__nuxt");

mutationObserver.observe(document, observerOptions);

export default mutationObserver;
