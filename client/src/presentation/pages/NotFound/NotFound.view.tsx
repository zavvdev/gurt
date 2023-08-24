import { Svg } from '~/presentation/assets/Svg';

export function NotFound() {
  return (
    <section className="flex justify-center items-center h-screen flex-col gap-8 max-md:gap-2">
      <Svg.Logo className="text-gray-300 max-md:w-12" />
      <div className="text-6xl font-thin text-gray-400 max-md:text-2xl">
        Сторінку не знайдено
      </div>
    </section>
  );
}
