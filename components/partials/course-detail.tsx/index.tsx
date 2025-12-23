'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  BadgeCheckIcon,
  CheckCheck,
  CheckCheckIcon,
  ChevronLeft,
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

const COURSES = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: `Course ${i + 1} - Lorem Ipsum Dolor ${i + 1}`,
  pass: i < 4 ? true : false,
}));

export default function CourseListDetail() {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMode, setVideoMode] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { setOpen } = useSidebar();

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
        {COURSES.map((item, i) => {
          return (
            <div
              key={i}
              className="flex items-center justify-between border-b py-4"
            >
              <div className={`font-semibold py-2 ${videoMode && 'text-xs'}`}>
                {item.name}
              </div>
              <div className="flex items-center gap-3">
                {item.pass && <CheckCheckIcon className="text-white" />}
                <Button
                  size="icon"
                  className={`${
                    item.pass
                      ? 'bg-gradient-to-r from-zinc-800 to-zinc-900 cursor-pointer hover:bg-black'
                      : 'bg-gradient-to-r from-red-600 to-red-900 cursor-pointer hover:bg-black'
                  }`}
                  onClick={() => {
                    videoModeChange(true);
                    setOpenSheet(false);
                  }}
                >
                  <PlayCircleIcon className="text-white" />
                </Button>
              </div>
            </div>
          );
        })}
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
                  value={20}
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
                <div className="text-white font-semibold text-sm">{20}%</div>
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
                }}
              >
                <ChevronLeft />
                <div>Return to Course</div>
              </Button>
              <div className="flex items-center gap-5">
                <Button
                  variant="secondary"
                  className="flex items-center gap-5 mb-6 bg-gradient-to-r from-red-600 to-red-900 cursor-pointer hover:bg-black"
                  onClick={() => {
                    setOpenConfirm(true);
                  }}
                >
                  <CheckCheck />
                  <div>Mark as done</div>
                </Button>
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
                  ? 'opacity-100 w-full bg-black py-6 border rounded-xl relative overflow-hidden'
                  : 'opacity-0'
              }`}
            >
              {/* Banner Overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 z-10 flex flex-col space-y-6 items-center justify-center group bg-zinc-900 cursor-pointer"
                  type="button"
                >
                  {/* Play Button */}
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-black/60 backdrop-blur-md group-hover:scale-110 transition">
                    <Play />
                  </div>
                  <div className="text-center font-semibold">
                    Press to play or pause
                  </div>
                </button>
              )}

              {/* Video */}
              <video
                ref={videoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                className="w-full h-[520px] rounded-xl"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </section>
            <div className="font-bold text-gray-300 text-lg md:text-2xl my-6">
              Course 1 of Course Lorem Ipsum Dolor - Development Phase 2025
            </div>
            <div className="text-gray-400 text-sm w-full md:w-1/2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nobis
              voluptas maxime ea maiores doloremque quod, illum dolor veritatis
              possimus ipsam mollitia facilis repellendus quo impedit ratione
              architecto aspernatur dolore. illum dolor veritatis possimus ipsam
              mollitia facilis repellendus quo impedit ratione architecto
              aspernatur dolore. illum dolor veritatis possimus ipsam mollitia
              facilis repellendus quo impedit ratione architecto aspernatur
              dolore.
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
                <div className="relative h-[200px] w-[300px] mb-3">
                  <Image
                    src="https://member.akademicreator.com/wp-content/uploads/2023/07/0.-FAST-TRACK-CREATOR-600x400.webp"
                    alt="image detail"
                    fill
                    className="object-cover rounded-lg"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="font-bold text-gray-100 text-xl md:text-2xl mb-3">
                  Course Lorem Ipsum Dolor - Development Phase 2025
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm text-gray-500">Category</div>{' '}
                    <div className="text-sm text-gray-100">Development</div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm text-gray-500">Instructor</div>{' '}
                    <div className="text-sm text-gray-100">John Doe</div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm text-gray-500">Level</div>{' '}
                    <div className="text-sm text-gray-100">Beginner</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 py-8">
              <div className="space-y-1">
                <div className="font-semibold text-xl text-gray-300">
                  Course Overview
                </div>
                <div className="text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                  nobis voluptas maxime ea maiores doloremque quod, illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore. illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore. illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore.
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-xl text-gray-300">
                  What You will Learn
                </div>
                <div className="text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                  nobis voluptas maxime ea maiores doloremque quod, illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore.
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-xl text-gray-300">
                  Course Features
                </div>
                <div className="text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                  nobis voluptas maxime ea maiores doloremque quod, illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore. illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore. illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore.
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-xl text-gray-300">
                  Certification
                </div>
                <div className="text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                  nobis voluptas maxime ea maiores doloremque quod, illum dolor
                  veritatis possimus ipsam mollitia facilis repellendus quo
                  impedit ratione architecto aspernatur dolore.
                </div>
              </div>
            </div>
          </div>

          {cardPlayList()}
        </div>
      )}

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="w-full md:max-w-md">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col items-center justify-center text-sm">
              <BadgeCheckIcon size={100} className="mb-6" />
              <div className="text-center text-3xl font-bold">Successfully</div>
              <div className="text-center font-semibold text-gray-300 mt-3">
                Go to the next module ?
              </div>

              <div className="flex items-center justify-between mt-10 w-full gap-6">
                <Button
                  variant="secondary"
                  className="w-1/3 flex items-center gap-5 mb-6 bg-gradient-to-r from-zinc-800 to-zinc-900 cursor-pointer hover:bg-black"
                  onClick={() => {
                    videoModeChange(false);
                    setOpenConfirm(false);
                  }}
                >
                  <div>Later</div>
                </Button>

                <Button
                  variant="secondary"
                  className="w-1/3 flex items-center gap-5 mb-6 bg-gradient-to-r from-red-600 to-red-900 cursor-pointer hover:bg-black"
                  onClick={() => {
                    videoModeChange(true);
                    setOpenConfirm(false);
                  }}
                >
                  <CheckCheck />
                  <div>Yes !</div>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
