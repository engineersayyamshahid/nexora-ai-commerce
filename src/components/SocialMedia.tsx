"use client";

import React from "react";
import Link from "next/link";
import {
  FaYoutube,
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaSlack,
} from "react-icons/fa";

const SocialLinks = [
  {
    title: "YouTube",
    href: "https://youtube.com",
    Icon: FaYoutube,
  },
  {
    title: "GitHub",
    href: "https://github.com",
    Icon: FaGithub,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com",
    Icon: FaLinkedinIn,
  },
  {
    title: "Facebook",
    href: "https://facebook.com",
    Icon: FaFacebookF,
  },
  {
    title: "Slack",
    href: "https://slack.com",
    Icon: FaSlack,
  },
];

const SocialMedia = () => {
  return (
    <div className="flex items-center gap-4">
      {SocialLinks.map((social) => {
        const Icon = social.Icon;

        return (
          <Link
            key={social.title}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.title}
            className="flex items-center justify-center hover:text-shop_light_green hoverEffect"
          >
            <Icon className="w-5 h-5" />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialMedia;