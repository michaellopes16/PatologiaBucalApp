cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
    "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
    "pluginId": "com.telerik.plugins.nativepagetransitions",
    "clobbers": [
      "window.plugins.nativepagetransitions"
    ]
  },
  {
    "id": "cordova-plugin-native-transitions.NativeTransitions",
    "file": "plugins/cordova-plugin-native-transitions/www/nativetransitions.js",
    "pluginId": "cordova-plugin-native-transitions",
    "clobbers": [
      "nativetransitions"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "com.telerik.plugins.nativepagetransitions": "0.6.5",
  "cordova-plugin-native-transitions": "0.2.3"
};
// BOTTOM OF METADATA
});