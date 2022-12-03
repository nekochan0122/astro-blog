export const SEO = {
  site: 'https://neko-astro-blog.vercel.app',
  title: 'NekoChan’s Blog',
  author: 'NekoChan',
  locale: 'en_US',
  twitter: {
    site: '@neko_chan_0122',
    creator: '@neko_chan_0122',
  },
  getTitle: (title: string) => `${title} - ${SEO.author}`,
}
