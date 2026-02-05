import React, { useEffect, useState } from 'react';
import { router, useRootNavigationState , Redirect } from 'expo-router';
import { useAuthStore } from '@/ts/auth/authStorage';
import  MainMobileWebView  from '../mainMobileWebView';

export default function index() {
   console.log(' rendering main')
   return  <MainMobileWebView /> ;
}
