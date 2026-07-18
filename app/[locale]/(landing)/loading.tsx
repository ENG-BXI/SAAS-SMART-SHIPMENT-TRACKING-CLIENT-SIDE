import React from 'react';

const Loading = () => {
  return (
    <main className='animate-pulse'>
      {/* Hero Skeleton */}
      <section className='relative m-3 h-175 overflow-hidden rounded-3xl bg-muted px-6 py-5 md:px-20'>
        <div className='flex h-full items-center'>
          <div className='max-w-2xl space-y-6'>
            <div className='h-8 w-40 rounded-full bg-muted-foreground/20' />

            <div className='space-y-3'>
              <div className='h-14 w-full rounded-xl bg-muted-foreground/20' />
              <div className='h-14 w-4/5 rounded-xl bg-muted-foreground/20' />
            </div>

            <div className='h-6 w-full max-w-xl rounded-lg bg-muted-foreground/20' />

            <div className='flex gap-4 pt-4'>
              <div className='h-12 w-40 rounded-full bg-muted-foreground/20' />
              <div className='h-12 w-40 rounded-full bg-muted-foreground/20' />
            </div>
          </div>
        </div>
      </section>

      {/* About Cards */}
      <section className='m-3 grid gap-5 md:grid-cols-3'>
        {[1, 2, 3].map(item => (
          <div key={item} className='aspect-square rounded-3xl bg-muted-foreground/20' />
        ))}
      </section>

      {/* Services */}
      <section className='container mx-auto my-20 px-5'>
        <div className='mx-auto mb-10 max-w-md space-y-4 text-center'>
          <div className='mx-auto h-6 w-40 rounded bg-muted-foreground/20' />
          <div className='mx-auto h-12 w-full rounded bg-muted-foreground/20' />
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div key={item} className='rounded-3xl border p-8'>
              <div className='mb-8 h-16 w-16 rounded-2xl bg-muted-foreground/20' />

              <div className='space-y-3'>
                <div className='h-7 w-2/3 rounded bg-muted-foreground/20' />
                <div className='h-5 w-full rounded bg-muted-foreground/20' />
                <div className='h-5 w-4/5 rounded bg-muted-foreground/20' />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Section */}
      <section className='container mx-auto my-28 px-5'>
        <div className='mb-12 space-y-4 text-center'>
          <div className='mx-auto h-6 w-40 rounded bg-muted-foreground/20' />
          <div className='mx-auto h-12 max-w-3xl rounded bg-muted-foreground/20' />
          <div className='mx-auto h-5 max-w-2xl rounded bg-muted-foreground/20' />
        </div>

        <div className='h-162.5 rounded-3xl bg-muted-foreground/20' />

        <div className='mt-5 grid gap-5 md:grid-cols-2'>
          {[1, 2].map(item => (
            <div key={item} className='h-107.5 rounded-3xl bg-muted-foreground/20' />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='container mx-auto my-24 px-4'>
        <div className='mx-auto max-w-3xl space-y-4 text-center'>
          <div className='mx-auto h-5 w-40 rounded bg-muted-foreground/20' />

          <div className='mx-auto h-12 w-full rounded bg-muted-foreground/20' />

          <div className='mx-auto h-5 w-3/4 rounded bg-muted-foreground/20' />
        </div>

        <div className='mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div key={item} className='rounded-3xl border p-6'>
              <div className='flex gap-5'>
                <div className='h-16 w-16 rounded-2xl bg-muted-foreground/20' />

                <div className='flex-1 space-y-3'>
                  <div className='h-6 w-2/3 rounded bg-muted-foreground/20' />
                  <div className='h-5 w-full rounded bg-muted-foreground/20' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Driver App */}
      <section className='overflow-hidden py-20'>
        <div className='container mx-auto grid gap-16 px-6 lg:grid-cols-2'>
          <div className='space-y-6'>
            <div className='h-8 w-40 rounded bg-muted-foreground/20' />

            <div className='h-14 w-full rounded bg-muted-foreground/20' />

            <div className='h-5 w-full rounded bg-muted-foreground/20' />

            {[1, 2, 3, 4].map(item => (
              <div key={item} className='h-6 w-3/4 rounded bg-muted-foreground/20' />
            ))}
          </div>

          <div className='mx-auto h-150 w-75 rounded-[3rem] bg-muted-foreground/20' />
        </div>
      </section>

      {/* Slider */}
      <section className='my-20'>
        <div className='grid gap-6 md:grid-cols-2'>
          {[1, 2, 3].map(item => (
            <div key={item} className='h-105 rounded-3xl bg-muted-foreground/20' />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className='container mx-auto px-4 py-20'>
        <div className='grid gap-12 lg:grid-cols-2'>
          <div className='space-y-5'>
            <div className='h-6 w-40 rounded bg-muted-foreground/20' />

            <div className='h-12 w-full rounded bg-muted-foreground/20' />

            <div className='h-20 w-full rounded bg-muted-foreground/20' />
          </div>

          <div className='space-y-4'>
            {[1, 2, 3, 4].map(item => (
              <div key={item} className='h-20 rounded-xl border bg-muted' />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='pt-20'>
        <div className='mx-auto h-40 max-w-5xl rounded-3xl bg-muted-foreground/20' />

        <div className='mt-5 h-52 w-full bg-muted-foreground/20' />
      </section>
    </main>
  );
};

export default Loading;
