import { RoomCard } from "@/components/room/room-card";
import type { RoomZone } from "@/lib/room";

type RoomZoneGridProps = {
  zones: RoomZone[];
};

export function RoomZoneGrid({ zones }: RoomZoneGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {zones.map((zone) => (
        <RoomCard key={zone.id} zone={zone} />
      ))}
    </div>
  );
}
