/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/consult` | `/(tabs)/explore` | `/_sitemap` | `/consult` | `/explore`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
