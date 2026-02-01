import React, { useEffect, useState } from 'react';
import { router, useRootNavigationState , Redirect } from 'expo-router';
import { useAuthStore } from '@/ts/auth/authStorage';
import  MainMobileWebView  from '../mainMobileWebView';

export default function index() {

   const { token, userId, hasHydrated } = useAuthStore();
   const navState = useRootNavigationState();

   return  <MainMobileWebView /> ;
}
