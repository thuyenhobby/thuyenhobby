import { RoomCard } from "@/components/room/room-card";
import type { RoomZone } from "@/lib/room";

type MobileRoomZonesProps = {
  zones: RoomZone[];
};

export function MobileRoomZones({ zones }: MobileRoomZonesProps) {
  return (
    <div className="grid gap-4 md:hidden">
      {zones.map((zone) => (
        <RoomCard key={zone.id} zone={zone} />
      ))}
    </div>
  );
}
