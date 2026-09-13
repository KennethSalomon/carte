"use client";

import React, { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Banknote, Check, MessageCircle, Star, UserRoundPlus } from "lucide-react";

const portraits = {
  amara:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=90",
  theo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=90",
  mila:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=90",
  jonah:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=90",
  anya:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=90",
  kai: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=90",
};

const css = String.raw`

  .orbitly-hero {
    font-family: var(--font-sans, "Instrument Sans", ui-sans-serif, system-ui, sans-serif);
    background: #fff;
    color: #17181b;
    position: relative;
    overflow: hidden;
    padding: 40px 0 60px;
    box-sizing: border-box;
  }
  .orbitly-hero *, .orbitly-hero *::before, .orbitly-hero *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 780px) {
    .orbitly-hero { overflow: visible; padding: 24px 0 40px; }
  }

  .orbitly-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 70% 88%, rgba(104,95,255,0.04), transparent 30%);
    pointer-events: none;
  }

  .orbitly-nav {
    width: min(1140px, calc(100% - 64px));
    height: 76px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    border-bottom: 1px solid #efeff2;
    position: relative;
    z-index: 10;
  }
  .orbitly-logo {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.45px;
    color: #17181b;
    text-decoration: none;
  }
  .orbitly-nav-center {
    display: flex;
    gap: 31px;
    font-size: 12px;
    font-weight: 500;
    color: #27282d;
    text-decoration: none;
  }
  .orbitly-nav-center a { color: inherit; text-decoration: none; }
  .orbitly-nav-right {
    display: flex;
    gap: 16px;
    justify-content: flex-end;
    align-items: center;
  }
  .orbitly-sign-in {
    background: transparent;
    border: none;
    font-size: 12px;
    color: #17181b;
    cursor: pointer;
    font-family: inherit;
  }
  .orbitly-book-call {
    height: 34px;
    padding: 0 17px;
    border-radius: 999px;
    background: #191a1d;
    color: #fff;
    font-size: 12px;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .orbitly-hero-grid {
    width: min(1140px, calc(100% - 64px));
    margin: 0 auto;
    display: grid;
    grid-template-columns: 45% 55%;
    grid-template-rows: auto auto;
    row-gap: 40px;
  }

  .orbitly-cell {
    position: relative;
    min-width: 0;
  }

  /* ===== TOP-LEFT ===== */
  .orbitly-top-left {
    display: flex;
    align-items: center;
    padding-top: 10px;
    perspective: 1200px;
  }
  .orbitly-board {
    width: 380px;
    height: 280px;
    position: relative;
    border: 1px solid #dfe2e7;
    background: rgba(255,255,255,0.76);
    background-image:
      linear-gradient(#e7e9ed 1px, transparent 1px),
      linear-gradient(90deg, #e7e9ed 1px, transparent 1px);
    background-size: 54px 46px;
  }
  .orbitly-paper-shapes {
    position: absolute;
    left: -32px;
    top: 34px;
    width: 175px;
    height: 210px;
    pointer-events: none;
  }
  .orbitly-paper {
    position: absolute;
    width: 105px;
    height: 175px;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    background: linear-gradient(145deg, rgba(235,239,245,0.94), rgba(246,248,250,0.45));
  }
  .orbitly-paper-1 { left: 0; top: 0; transform: rotate(-10deg); }
  .orbitly-paper-2 { left: 34px; top: 18px; opacity: 0.7; transform: rotate(10deg); }
  .orbitly-paper-3 { left: 64px; top: 55px; opacity: 0.42; transform: rotate(26deg); }

  .orbitly-offer-card {
    position: absolute;
    left: 36px;
    top: 20px;
    width: 300px;
    min-height: 180px;
    border-radius: 6px;
    overflow: hidden;
    background: rgba(255,255,255,0.98);
    box-shadow: 0 24px 56px rgba(54,56,72,0.14);
    transform-style: preserve-3d;
  }
  .orbitly-offer-header {
    height: 40px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
    background: linear-gradient(90deg, #6459ff, #5b53f6);
  }
  .orbitly-offer-body {
    padding: 18px 20px 16px;
  }
  .orbitly-profile-row {
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
  }
  .orbitly-profile-img {
    width: 52px;
    height: 52px;
    object-fit: cover;
    border-radius: 10px;
    position: relative;
  }
  .orbitly-status-dot {
    position: absolute;
    width: 17px;
    height: 17px;
    right: -3px;
    bottom: -3px;
    border: 3px solid white;
    background: #ff9d50;
    border-radius: 50%;
  }
  .orbitly-profile-name {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 3px;
  }
  .orbitly-profile-role {
    font-size: 10px;
    color: #777b85;
  }
  .orbitly-stage-pill {
    width: max-content;
    margin-top: 6px;
    padding: 3px 8px;
    border-radius: 999px;
    color: #c87a32;
    background: #fff2e7;
    font-size: 9px;
    font-style: normal;
  }

  /* Timeline */
  .orbitly-timeline {
    position: relative;
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .orbitly-timeline-base {
    position: absolute;
    left: 10.5%;
    top: 7px;
    width: 79%;
    height: 3px;
    border-radius: 999px;
    background: #e4e7ed;
  }
  .orbitly-timeline-progress {
    position: absolute;
    left: 10.5%;
    top: 7px;
    width: 79%;
    height: 3px;
    border-radius: 999px;
    transform-origin: left center;
    background: linear-gradient(90deg, #5e54f4 0%, #8179ff 45%, #5e54f4 100%);
    background-size: 220% 100%;
    box-shadow: 0 0 12px rgba(102,92,248,0.22);
    animation: orbitly-gradient 2.2s linear infinite;
  }
  @keyframes orbitly-gradient {
    0% { background-position: 100% 0; }
    100% { background-position: -120% 0; }
  }
  .orbitly-head-track {
    position: absolute;
    left: 10.5%;
    top: 0;
    width: 79%;
    height: 17px;
    z-index: 4;
    pointer-events: none;
  }
  .orbitly-head {
    width: 12px;
    height: 12px;
    top: 2px;
    border: 3px solid white;
    border-radius: 50%;
    background: #665cf8;
    position: absolute;
    transform: translateX(-50%);
    box-shadow: 0 0 0 5px rgba(102,92,248,0.11), 0 4px 12px rgba(72,62,210,0.22);
  }
  .orbitly-dot {
    width: 16px;
    height: 16px;
    margin: 0 auto 11px;
    border: 3px solid #dfe3e9;
    background: white;
    border-radius: 50%;
    position: relative;
    z-index: 2;
  }
  .orbitly-dot.active {
    border-color: #665cf8;
    background: #665cf8;
    box-shadow: inset 0 0 0 2px #fff;
  }
  .orbitly-dot.pulsing {
    animation: orbitly-pulse 1.2s ease-out infinite;
  }
  @keyframes orbitly-pulse {
    0% { transform: scale(1); box-shadow: inset 0 0 0 2px #fff, 0 0 0 0 rgba(102,92,248,0.12); }
    50% { transform: scale(1.16); box-shadow: inset 0 0 0 2px #fff, 0 0 0 7px rgba(102,92,248,0.12); }
    100% { transform: scale(1); box-shadow: inset 0 0 0 2px #fff, 0 0 0 0 rgba(102,92,248,0.12); }
  }
  .orbitly-tl-label {
    font-size: 9px;
    font-weight: 500;
    color: #232429;
    text-align: center;
  }
  .orbitly-tl-date {
    font-size: 8px;
    color: #9296a0;
    margin-top: 2px;
    text-align: center;
  }

  /* Manager tag */
  .orbitly-manager-tag {
    position: absolute;
    right: -34px;
    bottom: 48px;
    height: 46px;
    padding: 4px 9px 4px 4px;
    display: flex;
    align-items: center;
    gap: 7px;
    border-radius: 6px;
    background: #ff9f58;
    color: white;
    box-shadow: 0 14px 30px rgba(255,144,72,0.22);
  }
  .orbitly-manager-portrait {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.9);
  }
  .orbitly-manager-name { font-size: 9px; font-weight: 600; }
  .orbitly-manager-role { font-size: 8px; opacity: 0.84; }
  .orbitly-pointer {
    position: absolute;
    top: -8px;
    left: -6px;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 8px solid #ff9f58;
  }

  /* Round actions */
  .orbitly-round-actions {
    position: absolute;
    left: 144px;
    bottom: 20px;
    display: flex;
    gap: 20px;
  }
  .orbitly-round-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #edf0f4;
    color: #17181b;
    box-shadow: 0 6px 16px rgba(30,32,40,0.08);
    border: none;
    cursor: pointer;
  }
  .orbitly-round-btn.primary {
    background: #17181b;
    color: white;
  }

  /* ===== TOP-RIGHT ===== */
  .orbitly-top-right {
    padding: 40px 0 0 66px;
  }
  .orbitly-headline {
    margin: 0;
    max-width: 510px;
    color: #191a1d;
    font-size: clamp(36px, 4vw, 52px);
    line-height: 1.05;
    letter-spacing: -2.8px;
    font-weight: 700;
  }
  .orbitly-reviews {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 36px;
  }
  .orbitly-avatars {
    display: flex;
  }
  .orbitly-avatars img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border: 2px solid white;
    border-radius: 9px;
    margin-left: -7px;
  }
  .orbitly-avatars img:first-child { margin-left: 0; }
  .orbitly-stars {
    display: flex;
    gap: 3px;
    align-items: center;
  }
  .orbitly-rating-text {
    font-size: 13px;
    font-weight: 600;
    margin-left: 10px;
  }
  .orbitly-reviews-sub {
    font-size: 12px;
    color: #767a84;
    margin-top: 5px;
  }

  /* ===== BOTTOM-LEFT ===== */
  .orbitly-bottom-left {
    padding-top: 32px;
    padding-right: 60px;
    position: relative;
  }
  .orbitly-bottom-left p {
    max-width: 365px;
    color: #303137;
    font-size: 15px;
    line-height: 1.65;
    letter-spacing: -0.35px;
    position: relative;
    z-index: 1;
  }
  .orbitly-btn-row {
    margin-top: 27px;
    display: flex;
    gap: 12px;
    position: relative;
    z-index: 1;
  }
  .orbitly-btn {
    min-height: 42px;
    padding: 0 20px;
    border-radius: 999px;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    border: none;
  }
  .orbitly-btn.primary {
    background: #191a1d;
    color: white;
    box-shadow: 0 10px 25px rgba(24,25,28,0.1);
  }
  .orbitly-btn.secondary {
    background: white;
    color: #202126;
    border: 1px solid #dedfe3;
  }
  .orbitly-brand-mark {
    position: absolute;
    right: -35px;
    top: -20px;
    width: 270px;
    fill: #f0f3f7;
    opacity: 0.98;
    transform: rotate(6deg);
    z-index: 0;
  }

  /* ===== BOTTOM-RIGHT ===== */
  .orbitly-bottom-right {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 0 0 20px;
    perspective: 1100px;
  }
  .orbitly-mini-col {
    width: 170px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transform: rotate(-2deg);
  }
  .orbitly-mini-card {
    width: 100%;
    border: 1px solid rgba(231,232,237,0.92);
    background: rgba(255,255,255,0.95);
    box-shadow: 0 18px 45px rgba(45,48,60,0.1);
    backdrop-filter: blur(12px);
    border-radius: 9px;
    padding: 16px;
  }
  .orbitly-mini-card-1 {
    min-height: 94px;
    display: flex;
    align-items: center;
    gap: 13px;
  }
  .orbitly-icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #dffaf4;
    color: #22baa8;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .orbitly-stat-main {
    font-size: 12px;
    line-height: 1.2;
    font-weight: 600;
  }
  .orbitly-stat-sub {
    font-size: 10px;
    line-height: 1.3;
    color: #8a8e97;
    margin-top: 5px;
  }
  .orbitly-mini-card-2 {
    min-height: 116px;
    display: flex;
    align-items: flex-start;
    gap: 13px;
  }
  .orbitly-chat-img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }
  .orbitly-chat-name { font-size: 12px; font-weight: 600; }
  .orbitly-chat-quote {
    font-size: 10px;
    line-height: 1.45;
    color: #34363b;
    margin-top: 6px;
  }
  .orbitly-chat-time {
    font-size: 9px;
    color: #8a8e97;
    margin-top: 4px;
  }

  /* Payout card */
  .orbitly-payout-card {
    width: 340px;
    min-height: 190px;
    padding: 18px;
    border-radius: 10px;
    border: 1px solid rgba(231,232,237,0.92);
    background: rgba(255,255,255,0.95);
    box-shadow: 0 18px 45px rgba(45,48,60,0.1);
    backdrop-filter: blur(12px);
  }
  .orbitly-payout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .orbitly-payout-title { font-size: 12px; font-weight: 600; }
  .orbitly-payout-viewall {
    font-size: 10px;
    color: #665df8;
    background: none;
    border: none;
    cursor: pointer;
  }
  .orbitly-payout-grid {
    margin-top: 18px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 18px;
  }
  .orbitly-payout-row {
    display: grid;
    grid-template-columns: 30px minmax(0,1fr) auto 16px;
    align-items: center;
    gap: 8px;
  }
  .orbitly-payout-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  .orbitly-payout-name {
    font-size: 9.5px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .orbitly-payout-role {
    font-size: 8px;
    line-height: 1.2;
    color: #8c9099;
    margin-top: 3px;
  }
  .orbitly-payout-amount { font-size: 9px; }
  .orbitly-payout-check {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #25c9b0;
    display: grid;
    place-items: center;
    color: white;
  }
  .orbitly-pay-btn {
    margin-top: 20px;
    width: 100%;
    min-height: 35px;
    padding: 0 16px;
    border-radius: 999px;
    background: linear-gradient(90deg, #6a60ff, #5b53f2);
    color: white;
    font-size: 10px;
    font-family: inherit;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 22px rgba(99,91,255,0.23);
  }

  @media (max-width: 1040px) {
    .orbitly-hero-grid {
      grid-template-columns: 1fr 1fr;
      row-gap: 36px;
      padding: 32px 0 50px;
    }
    .orbitly-board { width: min(380px, 100%); }
    .orbitly-offer-card { left: 28px; width: calc(100% - 56px); }
    .orbitly-manager-tag { right: -8px; }
    .orbitly-top-right { padding: 32px 0 0 36px; }
    .orbitly-headline { font-size: clamp(32px, 4.5vw, 48px); }
    .orbitly-bottom-left { padding-right: 32px; padding-top: 24px; }
    .orbitly-bottom-right { padding-left: 14px; gap: 12px; }
    .orbitly-mini-col { width: 160px; }
    .orbitly-payout-card { width: min(320px, calc(100% - 174px)); padding: 16px; }
  }

  @media (max-width: 780px) {
    .orbitly-hero-grid {
      width: min(100% - 36px, 620px);
      grid-template-columns: 1fr;
      row-gap: 32px;
      padding-top: 20px;
    }
    .orbitly-top-right { padding: 16px 0 0; }
    .orbitly-headline {
      font-size: clamp(30px, 7vw, 44px);
      letter-spacing: -2px;
    }
    .orbitly-reviews { margin-top: 24px; }
    .orbitly-bottom-left { padding: 12px 0 0; }
    .orbitly-brand-mark { right: -70px; top: -40px; }
    .orbitly-bottom-right {
      padding: 20px 0 16px;
      flex-direction: column;
      align-items: stretch;
    }
    .orbitly-mini-col {
      width: 100%;
      flex-direction: row;
      gap: 10px;
    }
    .orbitly-mini-col > div { flex: 1; min-width: 0; }
    .orbitly-payout-card { width: 100%; }
    .orbitly-top-left { order: 2; justify-content: center; }
    .orbitly-bottom-right { order: 4; }
    .orbitly-top-right { order: 1; }
    .orbitly-bottom-left { order: 3; }
    .orbitly-board { margin: 0 auto; }
    .orbitly-manager-tag { right: 8px; bottom: 28px; }
    .orbitly-round-actions { left: 50%; transform: translateX(-50%); }
  }

  @media (max-width: 560px) {
    .orbitly-board { height: 240px; background-size: 40px 38px; }
    .orbitly-offer-card { left: 14px; top: 16px; width: calc(100% - 28px); }
    .orbitly-offer-body { padding: 10px; }
    .orbitly-profile-img { width: 36px; height: 36px; }
    .orbitly-profile-name { font-size: 10px; }
    .orbitly-profile-role { font-size: 8px; }
    .orbitly-stage-pill { font-size: 7px; padding: 2px 5px; }
    .orbitly-tl-label { font-size: 7px; }
    .orbitly-tl-date { font-size: 6px; }
    .orbitly-dot { width: 10px; height: 10px; }
    .orbitly-head { width: 8px; height: 8px; }
    .orbitly-manager-tag { right: 4px; bottom: 22px; height: 34px; padding: 2px 5px 2px 2px; }
    .orbitly-manager-portrait { width: 26px; height: 26px; }
    .orbitly-manager-name { font-size: 7px; }
    .orbitly-manager-role { font-size: 6px; }
    .orbitly-round-actions { left: 50%; bottom: 12px; gap: 8px; }
    .orbitly-round-btn { width: 28px; height: 28px; }
    .orbitly-headline {
      font-size: clamp(24px, 7vw, 36px);
      letter-spacing: -1.5px;
    }
    .orbitly-btn-row { flex-direction: column; }
    .orbitly-btn-row .orbitly-btn { width: 100%; }
    .orbitly-mini-col { flex-direction: row; gap: 8px; }
    .orbitly-mini-col > div { flex: 1; min-width: 0; }
    .orbitly-mini-card { padding: 10px; }
    .orbitly-mini-card-1 { min-height: 70px; }
    .orbitly-mini-card-2 { min-height: 85px; }
    .orbitly-icon-circle { width: 30px; height: 30px; }
    .orbitly-stat-main { font-size: 10px; }
    .orbitly-stat-sub { font-size: 8px; }
    .orbitly-chat-img { width: 26px; height: 26px; }
    .orbitly-chat-name { font-size: 9px; }
    .orbitly-chat-quote { font-size: 8px; }
    .orbitly-payout-card { width: 100%; min-height: auto; padding: 14px; }
    .orbitly-payout-grid { row-gap: 10px; column-gap: 10px; }
    .orbitly-payout-img { width: 24px; height: 24px; }
    .orbitly-payout-name { font-size: 9px; }
    .orbitly-payout-role { font-size: 7px; }
    .orbitly-payout-amount { font-size: 8px; }
    .orbitly-paper-shapes { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .orbitly-hero *, .orbitly-hero *::before, .orbitly-hero *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
    .orbitly-hero { scroll-behavior: auto; }
  }
`;

const timelineStages = [
  { label: "Commande", date: "14 mars" },
  { label: "Vérification", date: "14 mars" },
  { label: "Livraison", date: "14 mars" },
  { label: "Activée", date: "15 mars" },
];
const stageKeys = ["Applied", "Review", "Offer", "Onboard"] as const;

const payoutData = [
  { name: "Amara Bell", role: "Carte 250 €", amount: "250 €", img: portraits.amara },
  { name: "Theo Miles", role: "Carte 500 €", amount: "500 €", img: portraits.theo },
  { name: "Mila Hart", role: "Carte 150 €", amount: "150 €", img: portraits.mila },
  { name: "Kai Rowan", role: "Carte 1000 €", amount: "1 000 €", img: portraits.kai },
];

export default function OrbitlyRemoteTalentHero() {
  const [activeStep, setActiveStep] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 160, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22 });
  const paperX = useTransform(springX, [-1, 1], [-10, 10]);
  const paperY = useTransform(springY, [-1, 1], [-8, 8]);
  const boardRef = useRef<HTMLDivElement>(null);

  const cardRotateY = useSpring(0, { stiffness: 180, damping: 22 });
  const cardRotateX = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    let visible = false;
    const handleMouse = (e: MouseEvent) => {
      if (!visible) return;
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
      cardRotateY.set(nx * 5);
      cardRotateX.set(-ny * 5);
    };
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 },
    );
    observer.observe(el);
    window.addEventListener("mousemove", handleMouse);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [mouseX, mouseY, cardRotateY, cardRotateX]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const progressValues = [0, 0.3333, 0.6667, 1];
  const headPositions = ["0%", "33.33%", "66.66%", "100%"];

  return (
    <>
      <style>{css}</style>
      <div className="orbitly-hero">
        {/* Hero grid */}
        <div className="orbitly-hero-grid">
          {/* TOP-LEFT */}
          <div className="orbitly-cell orbitly-top-left">
            <motion.div
              className="orbitly-board"
              ref={boardRef}
              initial={{ opacity: 0, x: -32, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Paper shapes */}
              <motion.div className="orbitly-paper-shapes" style={{ x: paperX, y: paperY }}>
                <div className="orbitly-paper orbitly-paper-1" />
                <div className="orbitly-paper orbitly-paper-2" />
                <div className="orbitly-paper orbitly-paper-3" />
              </motion.div>

              {/* Offer card */}
              <motion.div
                className="orbitly-offer-card"
                style={{ rotateY: cardRotateY, rotateX: cardRotateX }}
                animate={{ y: [0, -5, 0], rotateZ: [-4, -3.5, -4] }}
                transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }, rotateZ: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
              >
                <div className="orbitly-offer-header">
                  {stageKeys[activeStep] === "Applied" && "Commande reçue"}
                  {stageKeys[activeStep] === "Review" && "Vérification en cours"}
                  {stageKeys[activeStep] === "Offer" && "Code prêt à envoyer"}
                  {stageKeys[activeStep] === "Onboard" && "Carte activée"}
                </div>
                <div className="orbitly-offer-body">
                  <div className="orbitly-profile-row">
                    <div style={{position:"relative"}}>
                      <img src={portraits.amara} alt="Amara" className="orbitly-profile-img" />
                      <div className="orbitly-status-dot" />
                    </div>
                    <div>
                      <div className="orbitly-profile-name">Amara Bell</div>
                      <div className="orbitly-profile-role">Carte 250 € Classique</div>
                      <div className="orbitly-stage-pill">
                        {stageKeys[activeStep] === "Applied" && "En attente"}
                        {stageKeys[activeStep] === "Review" && "Vérification"}
                        {stageKeys[activeStep] === "Offer" && "Prête"}
                        {stageKeys[activeStep] === "Onboard" && "Activée ✓"}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="orbitly-timeline">
                    <div className="orbitly-timeline-base" />
                    <motion.div
                      className="orbitly-timeline-progress"
                      animate={{ scaleX: progressValues[activeStep] }}
                      transition={{ type: "spring", stiffness: 72, damping: 19, mass: 0.9 }}
                    />
                    <div className="orbitly-head-track">
                      <motion.div
                        className="orbitly-head"
                        animate={{ left: headPositions[activeStep] }}
                        transition={{ type: "spring", stiffness: 72, damping: 19, mass: 0.9 }}
                      />
                    </div>
                    {timelineStages.map((s, i) => (
                      <div key={s.label} style={{textAlign:"center"}}>
                        <div className={`orbitly-dot ${i <= activeStep ? "active" : ""} ${i === activeStep ? "pulsing" : ""}`} />
                        <div className="orbitly-tl-label">{s.label}</div>
                        <div className="orbitly-tl-date">{i <= activeStep ? s.date : "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Manager tag */}
              <motion.div
                className="orbitly-manager-tag"
                animate={{ x: [0, 4, 0], y: [0, -5, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="orbitly-pointer" />
                <img src={portraits.jonah} alt="Jonah" className="orbitly-manager-portrait" />
                <div>
                  <div className="orbitly-manager-name">Jonah Reed</div>
                  <div className="orbitly-manager-role">Conseiller</div>
                </div>
              </motion.div>

              {/* Round actions */}
              <div className="orbitly-round-actions">
                <motion.button
                  className="orbitly-round-btn primary"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <UserRoundPlus size={16} />
                </motion.button>
                <motion.button
                  className="orbitly-round-btn"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <MessageCircle size={16} />
                </motion.button>
                <motion.button
                  className="orbitly-round-btn"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <Banknote size={16} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* TOP-RIGHT */}
          <div className="orbitly-cell orbitly-top-right">
            <motion.h1
              className="orbitly-headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Des milliers de clients<br />
              nous font confiance
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="orbitly-reviews">
                <div className="orbitly-avatars">
                  <img src={portraits.theo} alt="" />
                  <img src={portraits.mila} alt="" />
                  <img src={portraits.kai} alt="" />
                </div>
                <div className="orbitly-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={17} fill="#ffbd08" color="#ffbd08" />
                  ))}
                  <span className="orbitly-rating-text">4.9</span>
                </div>
              </div>
              <div className="orbitly-reviews-sub">de 1 800+ clients satisfaits</div>
            </motion.div>
          </div>

          {/* BOTTOM-LEFT */}
          <div className="orbitly-cell orbitly-bottom-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Vérifiez, commandez et activez vos cartes cadeaux en quelques minutes. Transcash, PCS ou Neosurf — un conseiller vous accompagne à chaque étape.
            </motion.p>
            <motion.div
              className="orbitly-btn-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link to="/cartes" className="orbitly-btn primary" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",textDecoration:"none",minHeight:42}}>Commander maintenant</Link>
              <Link to="/fonctionnement" className="orbitly-btn secondary" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",textDecoration:"none",minHeight:42}}>Comment ça marche</Link>
            </motion.div>

            {/* Brand mark */}
            <svg className="orbitly-brand-mark" viewBox="0 0 260 280">
              <path d="M63 22 176 138 116 154 208 249 158 270 67 181 127 162 26 61Z" />
              <path d="M150 66 232 145 191 158 247 215 211 231 150 175 190 160 116 88Z" />
            </svg>
          </div>

          {/* BOTTOM-RIGHT */}
          <div className="orbitly-cell orbitly-bottom-right">
            <motion.div
              className="orbitly-mini-col"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Mini card 1 */}
              <motion.div
                className="orbitly-mini-card orbitly-mini-card-1"
                animate={{ y: [0, -7, 0], rotate: [-2, -1, -2] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="orbitly-icon-circle">
                  <UserRoundPlus size={18} />
                </div>
                <div>
                  <div className="orbitly-stat-main">2 480 cartes livrées</div>
                  <div className="orbitly-stat-sub">+18 commandes en cours</div>
                </div>
              </motion.div>

              {/* Mini card 2 */}
              <motion.div
                className="orbitly-mini-card orbitly-mini-card-2"
                animate={{ y: [0, 7, 0], rotate: [1.4, 0.6, 1.4] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={portraits.anya} alt="Anya" className="orbitly-chat-img" />
                <div>
                  <div className="orbitly-chat-name">Anya Lane</div>
                  <div className="orbitly-chat-quote">&ldquo;Mon code Transcash est arrivé en 6 minutes. Impec&rdquo;</div>
                  <div className="orbitly-chat-time">il y a 2 min</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Payout card */}
            <motion.div
              className="orbitly-payout-card"
              initial={{ opacity: 0, x: 42, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: [3, 2, 3], y: [0, -7, 0] }}
              transition={{
                opacity: { duration: 0.75, delay: 0.5 },
                x: { duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="orbitly-payout-header">
                <span className="orbitly-payout-title">Dernières commandes</span>
                <Link to="/avis" className="orbitly-payout-viewall">Voir tout</Link>
              </div>
              <div className="orbitly-payout-grid">
                {payoutData.map((p) => (
                  <div className="orbitly-payout-row" key={p.name}>
                    <img src={p.img} alt={p.name} className="orbitly-payout-img" />
                    <div>
                      <div className="orbitly-payout-name">{p.name}</div>
                      <div className="orbitly-payout-role">{p.role}</div>
                    </div>
                    <div className="orbitly-payout-amount">{p.amount}</div>
                    <div className="orbitly-payout-check">
                      <Check size={10} strokeWidth={3} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="orbitly-pay-btn">Commander · dès 100 €</button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
