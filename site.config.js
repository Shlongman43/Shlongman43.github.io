/*
  Everything personal on the site lives here. Edit this file, refresh the page.

  Videos: drop .mp4 files (vertical 9:16) into assets/videos/ and list them below.
  A blank `src` shows a placeholder card instead, so the layout holds until you
  have real work to show. Leave a field empty ("") to hide it.
*/
window.SITE = {
  name: "Max Longman",
  shortName: "MAX LONGMAN",
  email: "ugcmaxlongman@gmail.com",
  location: "Provo, UT",

  // Socials: full URL plus the handle to display. Empty = hidden.
  instagram: { url: "", handle: "" },
  tiktok:    { url: "", handle: "" },
  x:         { url: "", handle: "" },

  // Optional: show a starting rate in the contact section. Empty = hidden.
  startingRate: "",

  // The phone in the hero. Use your strongest video.
  heroVideo: { src: "", poster: "", caption: "" },

  // The scrolling strip of work. `label` is the brand or product name under each card.
  videos: [
    { src: "", poster: "", label: "Your brand here" },
    { src: "", poster: "", label: "Product demo" },
    { src: "", poster: "", label: "Street interview" },
    { src: "", poster: "", label: "Unboxing" },
    { src: "", poster: "", label: "Skit with a cast" },
    { src: "", poster: "", label: "Testimonial" },
    { src: "", poster: "", label: "Problem / fix" },
  ],

  // Optional numbers for the About section, e.g. { value: 2.4, suffix: "M+", label: "Video plays" }.
  // Only add real numbers. Empty list = the row is hidden.
  stats: [],
};
