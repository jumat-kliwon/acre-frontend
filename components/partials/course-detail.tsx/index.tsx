'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  BadgeCheckIcon,
  CheckCheck,
  CheckCheckIcon,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Loader2,
  Play,
  PlayCircleIcon,
  VideoIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSidebar } from '@/components/ui/sidebar';
import { useCoursesDetail } from './hook';
import { formatDate } from '@/lib/helpers';

export default function CourseListDetail() {
  const router = useRouter();
  const detailHook = useCoursesDetail();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMode, setVideoMode] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  const { setOpen } = useSidebar();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const videoModeChange = (b: boolean) => {
    setOpen(!b);
    setVideoMode(b);
  };

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const playList = () => {
    return (
      <div>
        {detailHook.loadingModuleList ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[40px] bg-zinc-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {detailHook.moduleList?.data.map((item, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                {/* HEADER */}
                <div
                  onClick={() => toggle(i)}
                  className="p-4 bg-white/5 flex items-center justify-between rounded-lg cursor-pointer"
                >
                  <span className="font-semibold">{item.title}</span>
                  {openIndex === i ? <ChevronUp /> : <ChevronDown />}
                </div>

                {/* CONTENT */}
                {openIndex === i && (
                  <div
                    className={`mt-2 space-y-2 px-2 transition-all duration-300 ease-in-out ${
                      openIndex === i
                        ? 'max-h-[1000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.lessons.map((lesson, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between border-b py-3"
                      >
                        <div
                          className={`font-semibold ${videoMode && 'text-xs'}`}
                        >
                          {lesson.title}
                        </div>

                        <div className="flex items-center gap-3">
                          {lesson.is_completed && (
                            <CheckCheckIcon className="text-white" />
                          )}

                          <Button
                            size="icon"
                            className={
                              lesson.is_completed
                                ? 'bg-gradient-to-r from-zinc-800 to-zinc-900'
                                : 'bg-gradient-to-r from-red-600 to-red-900'
                            }
                            onClick={() => {
                              videoModeChange(true);
                              setOpenSheet(false);
                              detailHook.setIdLessons(lesson.id);
                            }}
                          >
                            {detailHook.loadingLessonDetail &&
                            detailHook.idLessons == lesson.id ? (
                              <Loader2 className="animate-spin text-white" />
                            ) : (
                              <PlayCircleIcon className="text-white" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const cardPlayList = () => {
    return (
      <div className={`col-span-1 ${videoMode && 'hidden md:block'}`}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="font-bold">Module List</div>
              <div className="flex items-center gap-3">
                <Progress
                  value={detailHook.moduleList?.progress.progress_percentage}
                  className="
                      h-[10px]
                      w-[120px]
                      rounded-full
                      bg-white/10
                      [&>div]:bg-gradient-to-r
                      [&>div]:from-red-500
                      [&>div]:to-red-900
                      [&>div]:rounded-full
                      [&>div]:transition-all
                    "
                />
                <div className="text-white font-semibold text-sm">
                  {detailHook.moduleList?.progress.progress_percentage}%
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground py-4">
            {playList()}
          </CardContent>
        </Card>
      </div>
    );
  };

  const onMarkDone = () => {
    if (detailHook.idLessons) {
      detailHook.markLessonDone(detailHook.idLessons);
    }
  };

  return (
    <section className="space-y-6">
      {videoMode ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardPlayList()}

          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <Button
                variant="secondary"
                className="flex items-center gap-5 mb-6"
                onClick={() => {
                  videoModeChange(false);
                  detailHook.setIdLessons(null);
                }}
              >
                <ChevronLeft />
                <div>Return to Course</div>
              </Button>
              <div className="flex items-center gap-5">
                {!detailHook.lessonDetail?.data.is_completed && (
                  <Button
                    variant="secondary"
                    className="flex items-center gap-5 mb-6 bg-gradient-to-r from-red-600 to-red-900 cursor-pointer hover:bg-black"
                    onClick={() => {
                      onMarkDone();
                    }}
                  >
                    {detailHook.loadingMarkDone ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <CheckCheck />
                    )}
                    <div>Mark as done</div>
                  </Button>
                )}
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                  <SheetTrigger asChild>
                    <Button
                      variant="secondary"
                      className="flex items-center gap-5 mb-6 bg-gradient-to-r from-zinc-800 to-zinc-900 cursor-pointer hover:bg-black md:hidden"
                    >
                      <VideoIcon />
                      <div>Show Modules</div>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Module List</SheetTitle>
                    </SheetHeader>

                    <div className="mt-4 overflow-y-auto px-5">
                      {playList()}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <section
              className={`transition-opacity duration-500${
                videoMode
                  ? 'opacity-100 w-full min-h-[520px] bg-black py-6 border rounded-xl relative overflow-hidden text-center'
                  : 'opacity-0'
              }`}
            >
              {/* Banner Overlay */}
              {/* {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 z-10 flex flex-col space-y-6 items-center justify-center group bg-zinc-900 cursor-pointer"
                  type="button"
                >
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-black/60 backdrop-blur-md group-hover:scale-110 transition">
                    <Play />
                  </div>
                  <div className="text-center font-semibold">
                    Press to play or pause
                  </div>
                </button>
              )}

              <video
                ref={videoRef}
                src={detailHook.lessonDetail?.data.content}
                controls
                className="w-full h-[520px] rounded-xl"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              /> */}
              <div
                className="text-gray-400"
                dangerouslySetInnerHTML={{
                  __html:
                    detailHook.lessonDetail?.data.content ??
                    '<div className="w-full h-[520px] rounded-xl"/>',
                }}
              />
            </section>
            <div className="font-bold text-gray-300 text-lg md:text-2xl my-6">
              {detailHook.loadingLessonDetail ? (
                <div className="h-[28px] w-full bg-zinc-800 rounded-lg animate-pulse mb-3" />
              ) : (
                <span>{detailHook.lessonDetail?.data.title}</span>
              )}
            </div>
            <div className="text-gray-400 my-2">
              {detailHook.loadingLessonDetail ? (
                <div className="h-[28px] w-[200px] bg-zinc-800 rounded-lg animate-pulse mb-3" />
              ) : (
                <span>
                  Completed at{' '}
                  {formatDate(detailHook.lessonDetail?.data.completed_at)}
                </span>
              )}
            </div>
            <div className="text-gray-400 my-2">
              {detailHook.loadingLessonDetail ? (
                <div className="h-[28px] w-[200px] bg-zinc-800 rounded-lg animate-pulse mb-3" />
              ) : (
                <span>
                  Last view at{' '}
                  {formatDate(detailHook.lessonDetail?.data.viewed_at)}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="col-span-1">
            <Button
              variant="secondary"
              className="flex items-center gap-5 mb-6"
              onClick={() => router.back()}
            >
              <ChevronLeft />
              <div>Back</div>
            </Button>

            <div className="border-b border-zinc-700 pb-8">
              <div className="flex flex-col justify-between items-start">
                {detailHook.loadingDetailCourse ? (
                  <div className="h-[200px] w-[300px] bg-zinc-800 rounded-lg animate-pulse mb-3" />
                ) : (
                  <div className="relative h-[200px] w-[300px] mb-3">
                    <Image
                      src={`https://lms.acrehub.lol/storage/${detailHook.detailCourse?.data.thumbnail}`}
                      alt="image detail"
                      fill
                      className="object-cover rounded-lg"
                      priority
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div className="w-full">
                {detailHook.loadingDetailCourse ? (
                  <div className="h-[28px] w-full bg-zinc-800 rounded-lg animate-pulse mb-3" />
                ) : (
                  <div className="font-bold text-gray-100 text-xl md:text-2xl mb-3">
                    {detailHook.detailCourse?.data.title}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm text-gray-500">Category</div>{' '}
                    {detailHook.loadingDetailCourse ? (
                      <div className="h-[28px] w-1/3 bg-zinc-800 rounded-lg animate-pulse" />
                    ) : (
                      <div className="text-sm text-gray-100">
                        {detailHook.detailCourse?.data.category.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm text-gray-500">Instructor</div>
                    {detailHook.loadingDetailCourse ? (
                      <div className="h-[28px] w-1/3 bg-zinc-800 rounded-lg animate-pulse" />
                    ) : (
                      <div className="text-sm text-gray-100">
                        {detailHook.detailCourse?.data.instructor.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 py-8">
              <div className="space-y-1">
                <div className="font-semibold text-xl text-gray-300">
                  Course Overview
                </div>
                {detailHook.loadingDetailCourse ? (
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[28px] bg-zinc-800 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html:
                        detailHook.detailCourse?.data.short_description ?? '',
                    }}
                  />
                )}
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-xl text-gray-300">
                  What You will Learn
                </div>
                {detailHook.loadingDetailCourse ? (
                  <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[28px] bg-zinc-800 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: detailHook.detailCourse?.data.description ?? '',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {cardPlayList()}
        </div>
      )}

      <Dialog
        open={detailHook.openConfirm}
        onOpenChange={detailHook.setOpenConfirm}
      >
        <DialogContent className="w-full md:max-w-md">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col items-center justify-center text-sm">
              <BadgeCheckIcon size={100} className="mb-6" />
              <div className="text-center text-3xl font-bold">Successfully</div>
              <div className="text-center font-semibold text-gray-300 mt-3">
                Stay on this modules ?
              </div>

              <div className="flex items-center justify-between mt-10 w-full gap-6">
                <Button
                  variant="secondary"
                  className="w-1/3 flex items-center gap-5 mb-6 bg-gradient-to-r from-zinc-800 to-zinc-900 cursor-pointer hover:bg-black"
                  onClick={() => {
                    videoModeChange(false);
                    detailHook.setOpenConfirm(false);
                    detailHook.setIdLessons(null);
                  }}
                >
                  <div>Later</div>
                </Button>

                <Button
                  variant="secondary"
                  className="w-1/3 flex items-center gap-5 mb-6 bg-gradient-to-r from-red-600 to-red-900 cursor-pointer hover:bg-black"
                  onClick={() => {
                    videoModeChange(true);
                    detailHook.setOpenConfirm(false);
                  }}
                >
                  <CheckCheck />
                  <div>Yes!</div>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
