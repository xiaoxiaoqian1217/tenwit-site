import { h } from "vue";
import { collectTargets } from "../../plugins/tracker/observer";

interface JimoTrackerWrapperProps {
  data: {
    event_type: string; // 事件类型
    block_desc?: string; // 模块
    button_desc?: string; // 块
    parameters?: any; // 拓展参数
  };
  type?: "click" | "clickAndSpm" | "spm" | "block" | "hide"; // type策略类型
  tagName?: any; // 标签名称
  className?: string; // 样式类名
  display?: "block" | "inlineBlock" | "inline"; // 块或行内
  key?: string;
  [key: string]: any;
}

export default function (props: JimoTrackerWrapperProps, { slots }: any) {
  console.log(
    "%c [ props ]-19",
    "font-size:13px; background:pink; color:#bf2c9f;",
    props
  );

  const handleClassName = (className = "", display: any) => {
    return (
      (className || display) &&
      className + (display ? `${(className ? " " : "") + styles[display]}` : "")
    );
  };

  const handleTypeFn = {
    // 点击埋点
    click: ({
      data,
      tagName,
      className,
      display,
      ...propsAndAttrs
    }: JimoTrackerWrapperProps) => {
      return h(
        tagName,
        {
          "data-jt-sender": JSON.stringify(data),
          class: handleClassName(className, display),
          ...propsAndAttrs,
        },
        slots.default?.()
      );
    },
    // 点击埋点+spm带入下页url
    clickAndSpm: ({
      data,
      tagName,
      className,
      display,
      ...propsAndAttrs
    }: JimoTrackerWrapperProps) => {
      return h(
        tagName,
        {
          "data-jt-sender": JSON.stringify(data),
          class: handleClassName(className, display),
          ...propsAndAttrs,
        },
        slots.default?.()
      );
    },
    // spm带入下页url
    spm: ({
      data,
      tagName,
      className,
      display,
      ...propsAndAttrs
    }: JimoTrackerWrapperProps) => {
      return h(
        tagName,
        {
          "data-jt-sender": JSON.stringify(data),
          class: handleClassName(className, display),
          ...propsAndAttrs,
        },
        slots.default?.()
      );
    },
    // 模块曝光
    block: ({
      data,
      tagName,
      className,
      display,
      ...propsAndAttrs
    }: JimoTrackerWrapperProps) => {
      return h(
        tagName,
        {
          "data-jt-block-exposure": JSON.stringify(data),
          // ref: _jt_.refreshBlockExposure,
          class: handleClassName(className, display),
          ...propsAndAttrs,
        },
        slots.default?.()
      );
    },
    // 隐藏元素曝光
    hide: ({
      data,
      tagName,
      className,
      display,
      ...propsAndAttrs
    }: JimoTrackerWrapperProps) => {
      return h(
        tagName,
        {
          "data-jt-hide-element-exposure": JSON.stringify(data),
          // ref: _jt_.refreshHideElementExposure,
          class: handleClassName(className, display),
          ...propsAndAttrs,
        },
        slots.default?.()
      );
    },
  };

  const {
    type = "click",
    tagName = "div",
    data,
    className,
    ...propsAndAttrs
  } = props;
  console.log(
    "%c [ type ]-130",
    "font-size:13px; background:pink; color:#bf2c9f;",
    type,
    data
  );
  const newProps = {
    ...propsAndAttrs,

    tagName,
    data: {
      ...data,
      type,
    },
  };
  const clickTrackerCreate = () => {
    return h(
      tagName,
      {
        "data-jt-sender": JSON.stringify(data),
        class: className,
        ...propsAndAttrs,
        type,
      },
      slots.default?.()
    );
  };
  const blockExposure = () => {
    return h(
      tagName,
      {
        "data-jt-block-exposure": JSON.stringify(data),
        // ref: collectTargets,
        class: className,
        ...propsAndAttrs,
        type,
      },
      slots.default?.()
    );
  };
  const hideExpoure = () => {
    return h(
      tagName,
      {
        "data-jt-hide-element-exposure": JSON.stringify(data),
        // ref: collectTargets,
        class: className,
        ...propsAndAttrs,
        type,
      },
      slots.default?.()
    );
  };
  if (type === "clickAndSpm") return clickTrackerCreate();
  if (type === "block") return blockExposure();
  if (type === "hide") return;

  // 返回渲染函数
  // return handleTypeFn[type](newProps);
}
