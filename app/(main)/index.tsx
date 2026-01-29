import React, { useEffect, useState } from 'react';
import { router, useRootNavigationState , Redirect } from 'expo-router';
import { useAuthStore } from '@/ts/auth/authStorage';

export default function index() {

   const { token, userId, hasHydrated } = useAuthStore();
   const navState = useRootNavigationState();

   return null;
}
