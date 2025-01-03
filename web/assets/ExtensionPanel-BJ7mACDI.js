var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as defineComponent, r as ref, cl as FilterMatchMode, cp as useExtensionStore, u as useSettingStore, aF as onMounted, p as computed, o as openBlock, v as createBlock, x as withCtx, g as createVNode, cm as SearchBox, y as unref, b_ as script, z as createBaseVNode, f as createElementBlock, P as renderList, a7 as toDisplayString, ax as createTextVNode, O as Fragment, C as script$1, h as createCommentVNode, aB as script$3, bw as script$4, c9 as script$5, cn as _sfc_main$1 } from "./index-DAOHvvrm.js";
import { s as script$2, a as script$6 } from "./index-DqWMa5Pc.js";
import "./index-CPVMarQJ.js";
const _hoisted_1 = { class: "flex justify-end" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExtensionPanel",
  setup(__props) {
    const filters = ref({
      global: { value: "", matchMode: FilterMatchMode.CONTAINS }
    });
    const extensionStore = useExtensionStore();
    const settingStore = useSettingStore();
    const editingEnabledExtensions = ref({});
    onMounted(() => {
      extensionStore.extensions.forEach((ext) => {
        editingEnabledExtensions.value[ext.name] = extensionStore.isExtensionEnabled(ext.name);
      });
    });
    const changedExtensions = computed(() => {
      return extensionStore.extensions.filter(
        (ext) => editingEnabledExtensions.value[ext.name] !== extensionStore.isExtensionEnabled(ext.name)
      );
    });
    const hasChanges = computed(() => {
      return changedExtensions.value.length > 0;
    });
    const updateExtensionStatus = /* @__PURE__ */ __name(() => {
      const editingDisabledExtensionNames = Object.entries(
        editingEnabledExtensions.value
      ).filter(([_, enabled]) => !enabled).map(([name]) => name);
      settingStore.set("Comfy.Extension.Disabled", [
        ...extensionStore.inactiveDisabledExtensionNames,
        ...editingDisabledExtensionNames
      ]);
    }, "updateExtensionStatus");
    const enableAllExtensions = /* @__PURE__ */ __name(() => {
      extensionStore.extensions.forEach((ext) => {
        if (extensionStore.isExtensionReadOnly(ext.name)) return;
        editingEnabledExtensions.value[ext.name] = true;
      });
      updateExtensionStatus();
    }, "enableAllExtensions");
    const disableAllExtensions = /* @__PURE__ */ __name(() => {
      extensionStore.extensions.forEach((ext) => {
        if (extensionStore.isExtensionReadOnly(ext.name)) return;
        editingEnabledExtensions.value[ext.name] = false;
      });
      updateExtensionStatus();
    }, "disableAllExtensions");
    const disableThirdPartyExtensions = /* @__PURE__ */ __name(() => {
      extensionStore.extensions.forEach((ext) => {
        if (extensionStore.isCoreExtension(ext.name)) return;
        editingEnabledExtensions.value[ext.name] = false;
      });
      updateExtensionStatus();
    }, "disableThirdPartyExtensions");
    const applyChanges = /* @__PURE__ */ __name(() => {
      window.location.reload();
    }, "applyChanges");
    const menu = ref();
    const contextMenuItems = [
      {
        label: "Enable All",
        icon: "pi pi-check",
        command: enableAllExtensions
      },
      {
        label: "Disable All",
        icon: "pi pi-times",
        command: disableAllExtensions
      },
      {
        label: "Disable 3rd Party",
        icon: "pi pi-times",
        command: disableThirdPartyExtensions,
        disabled: !extensionStore.hasThirdPartyExtensions
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        value: "Extension",
        class: "extension-panel"
      }, {
        header: withCtx(() => [
          createVNode(SearchBox, {
            modelValue: filters.value["global"].value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filters.value["global"].value = $event),
            placeholder: _ctx.$t("g.searchExtensions") + "..."
          }, null, 8, ["modelValue", "placeholder"]),
          hasChanges.value ? (openBlock(), createBlock(unref(script), {
            key: 0,
            severity: "info",
            "pt:text": "w-full",
            class: "max-h-96 overflow-y-auto"
          }, {
            default: withCtx(() => [
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(changedExtensions.value, (ext) => {
                  return openBlock(), createElementBlock("li", {
                    key: ext.name
                  }, [
                    createBaseVNode("span", null, toDisplayString(unref(extensionStore).isExtensionEnabled(ext.name) ? "[-]" : "[+]"), 1),
                    createTextVNode(" " + toDisplayString(ext.name), 1)
                  ]);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_1, [
                createVNode(unref(script$1), {
                  label: _ctx.$t("g.reloadToApplyChanges"),
                  onClick: applyChanges,
                  outlined: "",
                  severity: "danger"
                }, null, 8, ["label"])
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        default: withCtx(() => [
          createVNode(unref(script$6), {
            value: unref(extensionStore).extensions,
            stripedRows: "",
            size: "small",
            filters: filters.value
          }, {
            default: withCtx(() => [
              createVNode(unref(script$2), {
                header: _ctx.$t("g.extensionName"),
                sortable: "",
                field: "name"
              }, {
                body: withCtx((slotProps) => [
                  createTextVNode(toDisplayString(slotProps.data.name) + " ", 1),
                  unref(extensionStore).isCoreExtension(slotProps.data.name) ? (openBlock(), createBlock(unref(script$3), {
                    key: 0,
                    value: "Core"
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(unref(script$2), { pt: {
                headerCell: "flex items-center justify-end",
                bodyCell: "flex items-center justify-end"
              } }, {
                header: withCtx(() => [
                  createVNode(unref(script$1), {
                    icon: "pi pi-ellipsis-h",
                    text: "",
                    severity: "secondary",
                    onClick: _cache[1] || (_cache[1] = ($event) => menu.value.show($event))
                  }),
                  createVNode(unref(script$4), {
                    ref_key: "menu",
                    ref: menu,
                    model: contextMenuItems
                  }, null, 512)
                ]),
                body: withCtx((slotProps) => [
                  createVNode(unref(script$5), {
                    disabled: unref(extensionStore).isExtensionReadOnly(slotProps.data.name),
                    modelValue: editingEnabledExtensions.value[slotProps.data.name],
                    "onUpdate:modelValue": /* @__PURE__ */ __name(($event) => editingEnabledExtensions.value[slotProps.data.name] = $event, "onUpdate:modelValue"),
                    onChange: updateExtensionStatus
                  }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["value", "filters"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ExtensionPanel-BJ7mACDI.js.map
